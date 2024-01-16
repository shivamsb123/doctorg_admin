import { Injectable } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req, next) {
        var token=localStorage.getItem('token')
        var authRequest=req.clone({
            headers:req.headers.set('x-access-token',`${token}`)
        })
        return next.handle(authRequest)
    }
}
