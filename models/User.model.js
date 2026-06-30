import mongoose from 'mongoose';


const userScheme =  new mongoose.Schema({
    
    name : {
        type : String,
        require : true,
        trim :true
    },
//     Matlab: > * type: String: User ka naam hamesha text (ABC) hoga, number nahi ho sakta.

// required: true: Iske bina user register nahi ho sakta (naam likhna lazmi hai).

// trim: true: Agar user naam ke aage ya peeche galti se space de de (e.g., " ali "), tu yeh use khatam kar ke sirf "ali" save karega.

     email : {
        type :String,
        require : true,
        unique : true,
        trim  : true,
        lowercase : true
     },

   //  lowercase: true: Agar user Ali@Gmail.com likhe, tu yeh use khud hi ali@gmail.com 
   // (small letters) kar ke save karega taake baad me login me masla na ho.

     password : {
        type : String,
        minlength : 6 ,
        require : true
     },

} ,
      { timestamps: true }
 //   Matlab: Yeh Express aur MongoDB ka aik short-cut hai. Is line ki wajah se MongoDB har
 //  user ke data sath do cheezein khud ba khud save karega: createdAt (account kab bana) 
 // aur updatedAt (account kab update hua). Hamein khud se date likhne ki zaroorat nahi parti.
    
    
    );
 const User =  mongoose.model('User' , userScheme);


      export default User;


   // Matlab: Aakhir me humne is Rule Book (userSchema) ko pack kiya aur uska naam rakh diya User (Model). Ab poori app me jahan bhi hamein naya user banana hoga ya kisi user ko dhoondna hoga, hum is User model ko aawaz denge.