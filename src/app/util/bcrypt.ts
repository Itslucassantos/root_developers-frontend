// import * as bcrypt from 'bcrypt';

// // ...

// export const encrypt = (password: string): Promise<string> => {
//     const saltRounds = 10;

//     return new Promise((resolve, reject) => {
//         bcrypt.hash(password, saltRounds, (err: any, hash: string | PromiseLike<string>) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(hash);
//             }
//         });
//     });
// }
