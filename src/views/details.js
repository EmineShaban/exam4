import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteGames, getGameById} from '../api/data.js';
import { getUserData } from "../util.js";

const detailsTamplate = (game, onDelete, isOwner) => html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
${game.summary}
                </p>

                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        <li class="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li class="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    <!-- Display paragraph: If there are no games in the database -->
                    <p class="no-comment">No comments.</p>
                </div>

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                <div class="buttons">
                ${isOwner ? html`<a href="/edit/${game._id}" class="button">Edit</a>
                    <a href="javascript:void(0)" @click=${onDelete} class="button">Delete</a>` : ''}
             
                </div>
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            <article class="create-comment">
                <label>Add new comment:</label>
                <form class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>

        </section>`


export async function detailsPage(ctx) {
let game = await getGameById(ctx.params.id)

// const gameId = ctx.params.id;
// const game = await getPetById(gameId);
// const user = ctx.user;
let userData = getUserData()

// let userId;


// if (userData != null) {
    //     userId = userData.id
    
    // }
    
    
    const isOwner = userData && userData.id == game._ownerId;
    ctx.render(detailsTamplate(game, onDelete, isOwner))
    // console.log(pet._ownerId )
    // console.log(isOwner)
    // console.log(userData.id)


    // const isLoggedIn = userData !== undefined;

    // totalDonationCount = await getTotalDonationCount(petId);
    // ctx.render(detailsTamplate(pet, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));

    // async function onClickDonation() {
    //     const donation = {
    //         petId,
    //     }
    //     await donationPet(donation);

    //     totalDonationCount = await getTotalDonationCount(petId);
    //     didUserDonate = await didUserDonation(petId, userId);
    //     ctx.render(detailsTamplate(pet, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonation));
    // }

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteGames(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}




























// // // import { html } from "../../node_modules/lit-html/lit-html.js";
// // // import { deleteToy, getToyById } from "../api/data.js";
// // // import { getUserData } from "../util.js";

// // // let detailsTemplate = (toy, isOwner, onDelete) => html`

// // // <section id="details-page">
// // //     <h1 class="title">Post Details</h1>
// // //     <div id="container">
// // //         <div id="details">
// // //             <div class="image-wrapper">
// // //                 <img src=${toy.imageUrl} alt="Material Image" class="post-image">
// // //             </div>
// // //             <div class="info">
// // //                 <h2 class="title post-title">${toy.title}</h2>
// // //                 <p class="post-description">Description: ${toy.description}</p>
// // //                 <p class="post-address">Address: ${toy.address}</p>
// // //                 <p class="post-number">Phone number: ${toy.phone}</p>
// // //                 <p class="donate-Item">Donate Materials: 0</p>
// // //                 <!--Edit and Delete are only for creator-->
// // //                 <div class="btns">
// // //                     ${isOwner ? html`<a href="/edit/${toy._id}" class="edit-btn btn">Edit</a>
// // //                     <a href="javascript:void(0)" @click=${onDelete} class="delete-btn btn">Delete</a>` : ''}
// // //                     <!--Bonus - Only for logged-in users ( not authors )-->
// // //                     <!-- <a href="#" class="donate-btn btn">Donate</a> -->
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     </div>
// // // </section>
// // // `


// // // export async function detailsPage(ctx) {
// // //     const postId = ctx.params.id;
// // //     const toy = await getToyById(postId);
// // //     const user = ctx.user;

// // //     let userId;

// // //     if (user != null) {
// // //         userId = user._id        
// // //     }
// // //   console.log(user )
// // // //   console.log(user._id)
// // //   console.log(toy._id)

// // //     const isOwner = user && postId == toy._id;
// // //     // const isLoggedIn = user !== undefined;

// // //     // totalDonationCount = await getTotalDonationCount(postId);
// // //     ctx.render(detailsTemplate(toy, isOwner, onDelete));

// // //     async function onDelete() {
// // //         const confirmed = confirm('Are you sure?');
// // //         if (confirmed) {
// // //             await deleteToy(postId);
// // //             ctx.page.redirect('/');
// // //         }
// // //     }
// // //   }

// // // // export async function detailsPage(ctx) {
// // // //     const postId = ctx.params.id;
// // // //     const post = await getToyById(postId);
// // // //     const user = ctx.user;

// // // //     let userId;

// // // //     if (user != null) {
// // // //         userId = user._id
// // // //     }


// // // //     export async function detailsPage(ctx) {
// // // //         let userData = getUserData()
// // // //         let toy = await Promise.all([
// // // //             getToyById(ctx.params.id),
// // // //             // getLikesBytoyId(ctx.params.id),
// // // //             // userData ? getMyLikesBytoyId(ctx.params.id, userData.id) : 0
// // // //         ])
// // // //         let isOwner = userData && userData.id == toy._ownerId
// // // //         // let showLikeButton = isowner == false && hasLike == false && userData != null

// // // //         ctx.render(detailsTemplate(toy, isOwner, onDelete))


// // // //         async function onDelete() {
// // // //             const confirmed = confirm('Are you sure?');
// // // //             if (confirmed) {
// // // //                 await deleteToy(ctx.params.id)
// // // //                 ctx.page.redirect('/')
// // // //             }
// // // //         }

// // // //     }\









// // import { html } from '../../node_modules/lit-html/lit-html.js';
// // import { deleteToy, getToyById} from '../api/data.js';

// // const detailsTemplate = (post, isOwner, onDelete) => html`
// //     <!-- Details Page -->
// //     <section id="details-page">
// //       <h1 class="title">Post Details</h1>

// //       <div id="container">
// //         <div id="details">
// //           <div class="image-wrapper">
// //             <img src="${post.imageUrl}" alt="Material Image" class="post-image">
// //           </div>
// //           <div class="info">
// //             <h2 class="title post-title">${post.title}</h2>
// //             <p class="post-description">Description: ${post.description}</p>
// //             <p class="post-address">Address: ${post.address}</p>
// //             <p class="post-number">Phone number: ${post.phone}</p>
// //             <p class="donate-Item">Donate Materials: 0</p>
// //             <div class="btns">

// //               <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
// //               <a href="javascript:void(0)" @click=${onDelete} class="delete-btn btn">Delete</a>

// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// // `;

// // export async function detailsPage(ctx) {
// //   const postId = ctx.params.id;
// //   const post = await getToyById(postId);
// //   const user = ctx.user;

// // //   let userData = getUserData()

// // // console.log(userData.id)
// //   let userId;
// //   if (user != null) {
// //       userId = user._id

// //   }

// //   const isOwner = user && post._ownerId == user._id;

// // //   totalDonationCount = await getTotalDonationCount(postId);
// //   ctx.render(detailsTemplate(post, isOwner, onDelete));


// //   async function onDelete() {
// //       const confirmed = confirm('Are you sure?');
// //       if (confirmed) {
// //           await deleteToy(postId);
// //           ctx.page.redirect('/');
// //       }
// //   }
// // }






// import { html } from "../../node_modules/lit-html/lit-html.js";
// import { deleteToy, getToyById } from "../api/data.js";
// import { getUserData } from "../util.js";

// let detailsTemplate = (toy, isOwner, onDelete) => html`
// <section id="details-page">
//     <h1 class="title">Post Details</h1>
//     <div id="container">
//         <div id="details">
//             <div class="image-wrapper">
//                 <img src="./images/clothes.jpeg" alt="Material Image" class="post-image">
//             </div>
//             <div class="info">
//                 <h2 class="title post-title">${toy.title}</h2>
//                 <p class="post-description">Description: ${toy.description}</p>
//                 <p class="post-address">Address: ${toy.address}</p>
//                 <p class="post-number">Phone number: ${toy.phone}</p>
//                 <p class="donate-Item">Donate Materials: 0</p>

//                 <!--Edit and Delete are only for creator-->
//                 <div class="btns">
//                     <!-- ${toyControlsTemplates(toy, isOwner, onDelete)} -->

//                     <!-- <a href="#" class="edit-btn btn">Edit</a>
//                             <a href="#" class="delete-btn btn">Delete</a> -->

//                     <!--Bonus - Only for logged-in users ( not authors )-->
//                     <!-- <a href="#" class="donate-btn btn">Donate</a> -->
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>
// `

// // let toyControlsTemplates = (toy, isOwner, onDelete) => {
// //     if (isOwner) {
// //         return html`
// //         <a href="/edit/${toy._id}" class="edit-btn btn">Edit</a> -->
// //         <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a> -->
// //         `
// //     } else {
// //         return null
// //     }
// // }



// export async function detailsPage(ctx) {
//     let userData = getUserData()
//     let toy = await getToyById(ctx.params.id)

    

//     let isOwner = userData && userData.id == toy._ownerId
// console.log(userData.id )
// console.log(ctx.user)

//     ctx.render(detailsTemplate(toy, isOwner, onDelete))


//     async function onDelete() {
//         await deleteToy(ctx.params.id)
//         ctx.page.redirect('/')
//     }
// }