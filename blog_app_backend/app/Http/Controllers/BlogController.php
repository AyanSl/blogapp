<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\TempImage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function index(){
        $blogs = Blog::orderBy('created_at','DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $blogs
        ]);
    }

    public function show($id){
        $blog = blog::find($id);

        if($blog == null){
            return response()->json([
                'status' => false,
                'message' => 'Blog Not found',
            ]);
        }

        $blog['date'] = Carbon::parse($blog->created_at)->format('d M, y');

        return response()->json([
            'status' => true,
            'data' => $blog,
        ]);
    }

    // Store Blog
    public function store(Request $request){
        $Validator = Validator::make($request->all() ,[
            'title' => 'required|min:10',
            'author' => 'required|min:10'
        ]);

        if($Validator->fails()){
            return response()->json([
                'status' => false,
                'massage' => 'The All Error please Resolve',
                'error' => $Validator->errors()
            ]);
        }

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->shortdesc =  $request->shortdesc;
        $blog->description =  $request->description;
        $blog->author = $request->author;
        $blog->save();

        // Save Image Here

        $tempImage = TempImage::find($request->image_id);

        if($tempImage != null){
            $imageExArray = explode('.', $tempImage->name);
            $ext = last($imageExArray);
            $imageName = time().'-'.$blog->id.'.'.$ext;

            $blog->image = $imageName;
            $blog->save();

            $sourcePath = public_path('uploads/temp/'. $tempImage->name);
            $destPath = public_path('uploads/blogs/'. $imageName);
            File::copy($sourcePath , $destPath);
        }
        
        return response()->json([
            'status' => true,
            'massage' => 'Blog Posted Successfully',
            'data' => $blog
        ]);

    }

    // Update Blog
    public function update($id , Request $request){
        
        $blog = Blog::find($id);

        if($blog == null){
            return response()->json([
                'status' => false,
                'message' => "Blog not found",
            ]);
        }

        $Validator = Validator::make($request->all() ,[
            'title' => 'required|min:10',
            'author' => 'required|min:10'
        ]);

        if($Validator->fails()){
            return response()->json([
                'status' => false,
                'massage' => 'The All Error please Resolve',
                'error' => $Validator->errors()
            ]);
        }

        $blog->title = $request->title;
        $blog->shortdesc =  $request->shortdesc;
        $blog->description =  $request->description;
        $blog->author = $request->author;
        $blog->save();

        // Save Image Here

        $tempImage = TempImage::find($request->image_id);

        if($tempImage != null){
            File::delete(public_path('uploads/blogs/'. $blog->image));
            $imageExArray = explode('.', $tempImage->name);
            $ext = last($imageExArray);
            $imageName = time().'-'.$blog->id.'.'.$ext;

            $blog->image = $imageName;
            $blog->save();

            $sourcePath = public_path('uploads/temp/'. $tempImage->name);
            $destPath = public_path('uploads/blogs/'. $imageName);
            File::copy($sourcePath , $destPath);
        }
        
        return response()->json([
            'status' => true,
            'massage' => 'Blog Updated Successfully',
            'data' => $blog
        ]);
    }

    // Delete Blog
    public function delete($id){
        $blog = Blog::find($id);

        if($blog == null){
            return response()->json([
                'status' => false,
                'message' => "Blog not found",
            ]);
        }

        File::delete(public_path('uploads/blogs/'. $blog->image));

        $blog->delete();

        return response()->json([
            'status' => true,
            'massage' => 'Blog Delete Successfully'
        ]);
    }
}
