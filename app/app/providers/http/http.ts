import { Http } from '@angular/http';
import { url } from 'url';

class API extends Http{
    preprocess_url(url_string){
        var path = url.parse(url_string, true);
        path.query["api_key"] = localStorage["api_key"];
        path.query["username"] = localStorage["username"];
        return url.format(path);
    }
    request(url, options){
        return super.request(this.preprocess_url(url), options); 
    }
    get(url, options) {
        return super.get(this.preprocess_url(url), get, options);
    };
    post(url, body, options) {
        return super.post(this.preprocess_url(url), body, options);
    };
    put(url, body, options) {
        return super.put(this.preprocess_url(url), body, options);
    };
    delete(url, options) {
        return super.delete(this.preprocess_url(url), options);
    };
    patch(url, body, options) {
        return super.path(this.preprocess_url(url), body, options);
    };
    head(url, options) {
        return super.head(this.preprocess_url(url), options);
    };
}
