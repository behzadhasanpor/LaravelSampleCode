<?php

namespace App\Http\Middleware;

use App\appModels\Role;
use Closure;
use function Couchbase\defaultDecoder;

class CheckAdmin
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
        if($request->user()!=NULL && $request->user()->isAdmin())
            return $next($request);
        return abort(403,'شما اجازه دسترسی به این صفحه را ندارید.مختص ادمین ها');
    }
}
