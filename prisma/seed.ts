import { Post, PrismaClient, User } from "@/generated/prisma/client";

const users = [
  {
    email: "aabdoulhakim@gmail.com",
    username: "aabdoulhakim",
    displayName: "Abdallah Abdoulhakim",
    bio: "Hi I'm Abdallah Abdoulhakim. Welcome to my profile.",
    location: "Comores",
    job: "Developper",
    website: "inseed-comores.org",
  },
  {
    email: "ounais1@yahoo.fr",
    username: "ounais1",
    displayName: "Hamidou Said Ounais",
    bio: "Hi I'm Hamidou Said Ounais. Welcome to my profile.",
    location: "Comores",
    job: "Statistician",
    website: "inseed-comores.org",
  },
  {
    email: "adjoumoi@yahoo.fr",
    username: "adjoumoi",
    displayName: "Ahmed Djoumoi",
    bio: "Hi I'm Hamidou Ahmed Djoumoi. Welcome to my profile.",
    location: "Comores",
    job: "Statistician",
    website: "inseed-comores.org",
  },
  {
    email: "wildyrachik@gmail.com ",
    username: "wildyrachik",
    displayName: "Wildy Rachik",
    bio: "Hi I'm Rachik. Welcome to my profile.",
    location: "Comores",
    job: "Informatician",
    website: "inseed-comores.org",
  },
];

const posts = [
  {
    n: 1,
    desc: "doesn't like when there isn't anyone at the office to entertain me",
  },
  {
    n: 2,
    desc: "For me, it's goodnight  xo  P.S. Be sure to read Love Never Fails =D",
  },
  {
    n: 3,
    desc: "finally got the water outta her ear ! 6 Flags tmrw",
  },
  {
    n: 4,
    desc: "Show just wrapped. It's called &quot;Urban Erotica&quot; on MySpace if you'd like to check it out.",
  },
  {
    n: 5,
    desc: "Installed office for Mac &amp; messed up all my fonts on safari, crap on a stick! help! can't even read the solutions online  #badmicrosoft",
  },
  {
    n: 6,
    desc: "So, My company won't let me befriend any fellow employees (past and present) on facebook. If you were suddenly de-friended, don't be mad",
  },
  {
    n: 7,
    desc: "I wish I could pay someone to do my laundry at 3 am so I could get 5 hours of sleep instead of 3.",
  },
  {
    n: 8,
    desc: "O2 just called to give me a better deal with my phone package hopefully. System crash tho  come on o2",
  },
  {
    n: 9,
    desc: "I haven't done my maths homework yet. I've been too busy and i forgot about it. And now i am stuck with having to find my maths text book",
  },
  {
    n: 10,
    desc: "home, vegging with ali, watching casino royale, and becoming a &quot;follower&quot; by jumping on board this whole twitter thing",
  },
  {
    n: 11,
    desc: "Wondering what movies to rent tonight have to work first thing in the morning",
  },
  {
    n: 12,
    desc: "so bored that i'm rewatching lost from the beggining, so im pretending i dont know what happens. and OMG CLAIRE GOT KIDNAPPED",
  },
  {
    n: 13,
    desc: "kill bill and glass bottled coke. i wish i could get comfy",
  },
  {
    n: 14,
    desc: "just made a youtube vid  and is posting it right now",
  },
  {
    n: 15,
    desc: "Sitting on the bus, wet and tired. What a wonderful way to spend the evening. I just want to curl into a ball and go to sleep",
  },
  {
    n: 16,
    desc: "Josh just put &quot;Birdhouse in your Soul&quot; by TMBG on the jukebox for me... and it completely made my night.",
  },
  {
    n: 17,
    desc: "If you want to do business and have no idea how to start, please go to www.the100monkeys.com",
  },
  {
    n: 18,
    desc: "Feeling sluggish after some 10 hrs in bed; need to catch up on work emails and hate being under the weather",
  },
  {
    n: 19,
    desc: "just realised that i haven't switched the bedroom heater on and now i'll freeze my ass off when i go to bed",
  },
  {
    n: 20,
    desc: "is not going to have any teeth by the time she leaves lasha and asha's house because of all the abuse she is receiving",
  },
];

const responses = [
  {
    n: 1,
    parent: 0,
    desc: "Sooo completely mortified and depressed, God I just wanna shrivel up and blow away. ",
    user: 0,
  },
  {
    n: 2,
    parent: 1,
    desc: "alcatraz, castro, haight-ashbury, golden gate park, michelle tanners house, muni, bart, f-train, cable car all yesterday. last day today ",
    user: 1,
  },
  {
    n: 3,
    parent: 2,
    desc: "$5 threadless til next Monday! T-shirt buying time ",
    user: 2,
  },
  {
    n: 4,
    parent: 3,
    desc: "I get the best video ideas late at night, when i am tired and i look like crap. ",
    user: 3,
  },
  {
    n: 5,
    parent: 4,
    desc: "is out of the hot tub,&amp; succeeded in somehow bustin my boyfriend's knee up.  ouchie i feel bad, sitting next to me in a brace what a pair.",
    user: 0,
  },
  {
    n: 6,
    parent: 5,
    desc: "grey's anatomy season 5 finale is awesome! what a great show, i'm thankful i didn't gave up on this! ",
    user: 1,
  },
  {
    n: 7,
    parent: 6,
    desc: "the new Taking Back Sunday record is a bit of let-down  Still some decent songs on it though",
    user: 2,
  },
  {
    n: 8,
    parent: 7,
    desc: "about to watch mall cop with family and friends!!!!! ",
    user: 3,
  },
  {
    n: 9,
    parent: 8,
    desc: "Live Journal's 10 year birthday cake is pink, maybe because it's so happily full of slash? ",
    user: 0,
  },
  {
    n: 10,
    parent: 9,
    desc: "Attention Barcampers: One tame geek looking for a floor to sleep on. Do you have a floor I could sleep on?  cheers #bcleeds09",
    user: 1,
  },
  {
    n: 11,
    parent: 10,
    desc: "At work   Positive thoughts, positive thoughts. Woooosawwww",
    user: 2,
  },
  {
    n: 12,
    parent: 11,
    desc: "I love the sun  Been sitting in the garden with my cats. Cancer cat is becoming more unsteady on her feet, still purring and happy though",
    user: 3,
  },
  {
    n: 13,
    parent: 12,
    desc: "Desperate for a Mac  - I need iMovie and FC. Please God please!",
    user: 0,
  },
  {
    n: 14,
    parent: 13,
    desc: "Thur: 14.May: I should be in my shop all day today but please check first before you visit in case I have to pop out on an errand. Thanks ",
    user: 1,
  },
  {
    n: 15,
    parent: 14,
    desc: "Dominican Republic : tomorrow mother's day!!  happy mother's day mom! &lt;3",
    user: 2,
  },
  {
    n: 16,
    parent: 15,
    desc: "ThereÂ´s a storm in my heart  I hope it would pass *",
    user: 3,
  },
  {
    n: 17,
    parent: 16,
    desc: "One of those beautiful cool Oregon evenings outside on our deck that I kno we'll miss in PA! ",
    user: 0,
  },
  {
    n: 18,
    parent: 17,
    desc: "Finally done with exams, have this terrible nagging headache prob from those wine coolers bouta lay down for a min ",
    user: 1,
  },
  {
    n: 19,
    parent: 18,
    desc: "good day. tomorrow is the last day of school. only 2hrs. ",
    user: 2,
  },
  {
    n: 20,
    parent: 19,
    desc: "i'm the sun, then i'm the rain. i'm someone you can't explain ",
    user: 3,
  },
  {
    n: 21,
    parent: 0,
    desc: "happy fathers day 2 the one person who ever did and ever will love me more then themselves I miss u daddy  Rip",
    user: 0,
  },
  {
    n: 22,
    parent: 1,
    desc: "it's raining pretty hard... a boyfriend would come handy in these situations. bear hug! ",
    user: 1,
  },
  {
    n: 23,
    parent: 2,
    desc: "you mean the microphones stand that nearly fell over? You guys held up pretty well through that incident ",
    user: 2,
  },
  {
    n: 24,
    parent: 3,
    desc: "It's 2:30AM and I'm still up! I have to get up early tomorrow to write a paper, BLAH! ",
    user: 3,
  },
  {
    n: 25,
    parent: 4,
    desc: "greek picnic with my sisters. AND waking up everyday at 8 nxt wk.  smh...",
    user: 0,
  },
  {
    n: 26,
    parent: 5,
    desc: "It's the second time it rains on my Birthday.. duuh    But it still a great day :]",
    user: 1,
  },
  {
    n: 27,
    parent: 6,
    desc: "How is everyone? I havent heard from a lot of you in a while. Did I do something wrong?  I cant wait for u all to hear our new record.",
    user: 2,
  },
  {
    n: 28,
    parent: 7,
    desc: "This morning I'm having a Taylor Lautner obsession. He's so awesome! ",
    user: 3,
  },
  {
    n: 29,
    parent: 8,
    desc: "Effffff. Sore from the arcade vut it was fun. Almost back to Mike's. Had to pick up cough drops and advil for my fever  feelin' betr tho!",
    user: 0,
  },
  {
    n: 30,
    parent: 9,
    desc: "Today is a forced PTO day  despite being up and there being work that needs to be done. I think I'm going to say no, and go for a run.",
    user: 1,
  },
  {
    n: 31,
    parent: 10,
    desc: "Why do I have that annoying Pink song stuck in my head ",
    user: 2,
  },
  {
    n: 32,
    parent: 11,
    desc: "slept for like 5 hours.. lol. i want to go to craigs party! but donno if i can ",
    user: 3,
  },
  {
    n: 33,
    parent: 12,
    desc: "Just got home and it's weird....I miss my other home at the lodge.  I don't hear my waterfalls. ",
    user: 0,
  },
  {
    n: 34,
    parent: 13,
    desc: "I'm wondering what to wear today...  I sure wish I had my basket weave sandals! ",
    user: 1,
  },
  {
    n: 35,
    parent: 14,
    desc: "On my way to norfolk to spend some time with brian in freakin ICU. Phone will be off. Just keep him in your thoughts. ",
    user: 2,
  },
  {
    n: 36,
    parent: 15,
    desc: "Phone officially broken  New phone in 7-14 days. Catch me on Twitter in the meantime. Lame. Frustrated. Hitting the gym. 3 in the morning.",
    user: 3,
  },
  {
    n: 37,
    parent: 16,
    desc: "I know i talk a lot about &quot;that boy&quot; i just have to get over him...............it has been one month and  a day since &quot;the end&quot; happened ",
    user: 0,
  },
  {
    n: 38,
    parent: 17,
    desc: "today is about sorting out where I work - currently too cluttered ",
    user: 1,
  },
  {
    n: 39,
    parent: 18,
    desc: "okay, so baking caramel shortcake is out of question. mum doesnt fancy caramel!!! suggestions for the big mother's day?? ",
    user: 2,
  },
  {
    n: 40,
    parent: 19,
    desc: "getting ready for work...do I really have to go today? ",
    user: 3,
  },
  {
    n: 41,
    parent: 0,
    desc: "is with with Maggie,Natalie,Josh,Andrew,&amp;&amp; Alec. ",
    user: 0,
  },
  {
    n: 42,
    parent: 1,
    desc: "I'M GRADUATING TODAY. NOOOOOOOOO. I'm gonna miss high school  Class of '09 so fine!",
    user: 1,
  },
  {
    n: 43,
    parent: 2,
    desc: "Finished studying!!!At last!!! Fuck ...It was a long day,I'm going to sleep ",
    user: 2,
  },
  {
    n: 44,
    parent: 3,
    desc: "is still not feeling too good  ...maybe i need another drink to recover fully? ;)",
    user: 3,
  },
  {
    n: 45,
    parent: 4,
    desc: "It's raining  Can't be bothered to do anything I should be doing",
    user: 0,
  },
  {
    n: 46,
    parent: 5,
    desc: "cudnt study longer than this..  but its ok.. i studied last nyt n 6 hours or so in morning.. so that compensates for some no study today",
    user: 1,
  },
  {
    n: 47,
    parent: 6,
    desc: "My bus driver is a maniac! It's like a bloody white knuckle ride on here! ",
    user: 2,
  },
  {
    n: 48,
    parent: 7,
    desc: "finished reading 'Valley of the Dolls' - loved loved loved - but don't like starting a fresh book late at night ",
    user: 3,
  },
  {
    n: 49,
    parent: 8,
    desc: "We're going to Sushi Buffet!! I will be in heaven shortly... Helping my lil sis with flash cards now.. She's a fast learner. ",
    user: 0,
  },
  {
    n: 50,
    parent: 9,
    desc: "man i really wanted stevros flatley to win BGT  ah well",
    user: 1,
  },
  {
    n: 51,
    parent: 10,
    desc: "eating my really nasty chocolate cake it turned out really bad i never make em right  oh well",
    user: 2,
  },
  {
    n: 52,
    parent: 11,
    desc: "I can't believe ppl write a jumble of words that are trend topics and ask ppl to follow them! Why should you care! Get real friends ppls ",
    user: 3,
  },
  {
    n: 53,
    parent: 12,
    desc: "halo halo testing testing... is friday... moodless to work haha although i have a lot to do ",
    user: 0,
  },
  {
    n: 54,
    parent: 13,
    desc: "Wow my whole body is sore and I have no idea why. Lol; I miss LA ",
    user: 1,
  },
  {
    n: 55,
    parent: 14,
    desc: "Just get home.. Finally! Tomorrow I need to take my bike to the bike shop becase something is wrong with it. Now is time to study.. Weeee ",
    user: 2,
  },
  {
    n: 56,
    parent: 15,
    desc: "Is really happy I didn't ruin my cell phone, its work perfectly even after it got soaking wet in the strom drain!!!! ",
    user: 3,
  },
  {
    n: 57,
    parent: 16,
    desc: "&quot;im tired of smiling on the outside while im crying on the inside. ive been doing that for a long time.&quot; -kate. ",
    user: 0,
  },
  {
    n: 58,
    parent: 17,
    desc: "I miss some people terribly but I still can't get over the fact that they did some thing terrible to me as well ",
    user: 1,
  },
  {
    n: 59,
    parent: 18,
    desc: "sad that I got screwed out of going to EDC this weekend.... ",
    user: 2,
  },
  {
    n: 60,
    parent: 19,
    desc: "Me and joe's one year Anniversary is today  i love him with all my heart and Penis",
    user: 3,
  },
];

const prisma = new PrismaClient();
async function main() {
  const usersList: User[] = [];

  for (let i = 0; i < 4; i++) {
    const user = await prisma.user.create({
      data: users[i],
    });

    usersList.push(user);
  }

  const postsList: Post[] = [];

  for (let i = 0; i < posts.length; i++) {
    const post = await prisma.post.create({
      data: {
        desc: posts[i].desc,
        userId: usersList[i % 4].id,
      },
    });

    postsList.push(post);
  }

  await prisma.follow.createMany({
    data: [
      { followerId: usersList[0].id, followingId: usersList[1].id },
      { followerId: usersList[0].id, followingId: usersList[2].id },
      { followerId: usersList[1].id, followingId: usersList[3].id },
      { followerId: usersList[3].id, followingId: usersList[0].id },
    ],
  });

  await prisma.like.createMany({
    data: [
      { userId: usersList[0].id, postId: postsList[0].id },
      { userId: usersList[1].id, postId: postsList[1].id },
      { userId: usersList[2].id, postId: postsList[2].id },
      { userId: usersList[3].id, postId: postsList[3].id },
    ],
  });

  const comments: Post[] = [];

  for (let i = 0; i < responses.length; i++) {
    const comment = await prisma.post.create({
      data: {
        desc: responses[i].desc,
        userId: usersList[responses[i].user].id,
        parentPostId: postsList[responses[i].parent].id,
      },
    });

    comments.push(comment);
  }

  const reposts = [];

  for (let i = 0; i < postsList.length; i++) {
    const repost = await prisma.post.create({
      data: {
        desc: `Repost of Post ${postsList[i].id} by ${
          users[(i + 2) % 4].username
        }`,
        userId: usersList[(i + 2) % 4].id,
        rePostId: postsList[i].id,
      },
    });

    reposts.push(repost);
  }

  await prisma.savedPost.createMany({
    data: [
      { userId: usersList[0].id, postId: postsList[1].id },
      { userId: usersList[1].id, postId: postsList[2].id },
      { userId: usersList[2].id, postId: postsList[3].id },
      { userId: usersList[3].id, postId: postsList[4].id },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
