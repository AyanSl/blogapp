<?php

namespace App\Http\Controllers;

use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
    public function store(Request $request){

        $validate = Validator::make($request->all(),[
            'image' => 'required|image'
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'massage' => 'The All Error please Resolve',
                'error' => $validate->errors()
            ]);
        }

        $image = $request->image;
        $ext = $image->getClientOriginalExtension();
        $imageName = time().'.'.$ext;

        $tempImage = new TempImage();
        $tempImage->name =  $imageName;
        $tempImage->save();

        $image->move(public_path('uploads/temp'), $imageName);

        return response()->json([
            'status' => true,
            'message' => 'Image upload successfully',
            'image' => $tempImage,
        ]);

    }
}
