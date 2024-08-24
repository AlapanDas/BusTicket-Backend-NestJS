import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js'
import { user, userDetails, userLogin } from './types/user_auth'
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) { }


  getHello(): string {
    return 'Hello World!';
  }

  async getUser(response: userLogin): Promise<user> {
   
    const supabase = createClient(process.env.URL, process.env.KEY);

    const { data, error } = await supabase.from('user_user').select('*').eq('username', response.username);

    if (error || !data || data.length === 0) {
      return { status: false, username: "", email: "Error in the Request", access_token: "error", isAdmin: false }; // Return error response if there's an issue or no data found
    }

    if (data[0].password === response.password) {

      // Construct userDetails response
      const responseData: userDetails = {
        username: data[0]['username'],
        fullname: data[0]['fullname'],
        email: data[0]['email'],
      };

      // Generate JWT token
      const payload = { username: responseData.username, isAdmin: data[0].isAdmin };
      const accessToken = this.jwtService.sign(payload);

      return { status: true, username: responseData.username, email: responseData.email, access_token: accessToken, isAdmin: data[0].isAdmin };
    } else {
      return { status: false, username: "", email: "error", access_token: "error", isAdmin: false };
    }
  }
}
