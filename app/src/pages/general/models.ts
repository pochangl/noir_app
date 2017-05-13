import { Model } from '../../model';

export class Auth extends Model {
  resource_name = 'account/auth';
  fields = [
    'username', 'password'
  ];
  username: string;
  password: string;

  login_user() {
    return new Promise<any>((resolve, reject) => {
      this.api.post({
        resource_name: 'account/auth',
        urlParams: {username: this.username, password: this.password}
      }, this.serialize()).subscribe(
        data => resolve(),
        error => {
          alert('Please Check Your Account Name And Password.')
          // reject(error)
        }
      );
    });
  }

  logout_user() {
    // cannot ge user information, so there is no username @@?
    return new Promise<any>((resolve, reject) => {
      this.api.delete({
        resource_name: 'account/auth',
        urlParams: {username: this.username}
      }, this.serialize()).subscribe(
        data => resolve(),
        error => reject(error)
      );
    });
  }
}
