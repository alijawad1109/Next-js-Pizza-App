// // import bcrypt from ' bcryptjs'
// import { Schema, model, models } from "mongoose";
// const UserSchema = new Schema({
//   email: { 
//     type: String, 
//     required: true ,
//     unique:true
// },
// password:{
//     type: String, 
//     required: true ,
//     validate:(pass)=>{
//         if(!pass.length || pass.length < 8){
//             new Error('passord must be 8 characters') 
//             return false;
//         }
//     }
// }
// },{timestamps:true});

// // UserSchema.post('validate',function (user){
// //     const notHashedPassword= user.password
// //     const salt =bcrypt.generateSalt(10);
// //     user.password= bcrypt.hashSync(notHashedPassword,salt)
// // })

// export const User =models?.User || model('users', UserSchema)
import bcrypt from 'bcryptjs';
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name:{type:String},
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true,
    validate: (pass) => {
      if (!pass.length || pass.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
    }
  },
  phone:{type:String},
  address:{type:String},
  code:{type:String},
  country:{type:String},
  city:{type:String},
  admin:{type:Boolean,default:false}
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

export const User = models?.User || model('User', UserSchema);
