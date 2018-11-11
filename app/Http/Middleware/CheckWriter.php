<?php

namespace App\Http\Middleware;

use Closure;

class CheckWriter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->user()!=NULL && $request->user()->isWriter())
            return $next($request);
        return abort(403,'شما اجازه دسترسی به این صفحه را ندارید.مختص نویسنده هاست ها');
    }
}
