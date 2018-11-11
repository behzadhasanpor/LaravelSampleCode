<?php


namespace App\AppDirectory\Traits;


trait CarAssignments
{
    public $mainAttributes=[
        'name'=>'نام',
        'number_of_Cylinder'=>'تعداد سیلندر',
        'volume_of_engine'=>'حجم موتور',
        'price'=>'قیمت',
    ];
    public $pricesAttributes=[
        'fresh_car_price'=>'قیمت تازه',
        'worked_car_price'=>'قیمت کارکرده',
    ];
    public $technicalAttributes=[
        'year_of_creation'=>'سال ساخت',
        'engine'=>'موتور',
        'maximum_power'=>'حداکثر قدرت',
        'maximum_torque'=>'حداکثر شتاب',
        'zero_to_hundred_acceleration'=>'شتاب صفر تا صد',
        'maximum_speed'=>'حداکثر سرعت',
        'dimensionWidth'=>'عرض',
        'dimensionHeight'=>'ارتفاع',
        'dimensionLength'=>'طول',
        'distance_of_two_axis'=>'فاصله دو محور',
    ];
    public $abilitiesAttributes=[
        'brakes'=>'ترمز',
        'air_bag'=>'کیسه هوا',
        'audio_system'=>'سیستم صوتی',
        'other_facilities'=>'امکانات دیگر',
    ];
    public $oil_consumptionsAttributes=[
        'type_of_oil'=>'نوع سوخت',
        'inside_town_oil_consumption'=>'مصرف سوخت داخل شهر',
        'outside_town_oil_consumption'=>'مصرف سوخت بیرون شهر',
        'hybrid_oil_consumption'=>'مصرف سوخت هیبریدی',
        'tank_volume'=>'حجم باک',
        'pollution_standard'=>'استاندارد آلایندگی',
        'co2_production_level'=>'مقدار تولید co2',
        'security_standard'=>'استاندارد امنیت',
    ];
    public $car_fields=
        [
            'main',
            'prices',
            'abilities',
            'technicals',
            'oil_consumptions',

        ];
}