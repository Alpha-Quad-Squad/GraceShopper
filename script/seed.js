"use strict";
const colors = require("colors");
const {
  db,
  models: { User, InventoryItem, ShoppingItem, Purchase },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!".rainbow);

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", isAdmin: false }),
    User.create({ username: "murphy", password: "123", isAdmin: true }),
    User.create({ username: "lucy", password: "123", isAdmin: false }),
    User.create({ username: "john", password: "123", isAdmin: false }),
    User.create({ username: "stacie", password: "123", isAdmin: false }),
    User.create({ username: "kim", password: "123", isAdmin: true }),
    User.create({ username: "eric", password: "123", isAdmin: false }),
    User.create({ username: "mike", password: "123", isAdmin: true }),
    User.create({ username: "jenn", password: "123", isAdmin: false }),
    User.create({ username: "tom", password: "123", isAdmin: false }),
    User.create({ username: "lisa", password: "123", isAdmin: true }),
  ]);

  // Creating Inventory Items
  const inventoryItems = await Promise.all([
    InventoryItem.create({
      itemName: "The Last Wish by Andrezej Sapkowski",
      itemDescription:
        "The Last Wish is the first of the two collections of short stories preceding the main Witcher Saga, written by Polish fantasy writer Andrzej Sapkowski. The first Polish edition was published in 1993 and the first English edition was first published in 2007.",
      itemPrice: 8.99,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81DRSc6YPjS.jpg",
    }),
    InventoryItem.create({
      itemName: "Kafka On The Shore by Haruki Murakami",
      itemDescription:
        'Kafka on the Shore is a 2002 novel by Japanese author Haruki Murakami. Its 2005 English translation was among "The 10 Best Books of 2005" from The New York Times and received the World Fantasy Award for 2006.',
      itemPrice: 13.69,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81zvseHim4L.jpg",
    }),
    InventoryItem.create({
      itemName: "100 Years of Solitude by Gabriel García Márquez",
      itemDescription:
        "One Hundred Years of Solitude is a 1967 novel by Colombian author Gabriel García Márquez that tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The novel is often cited as one of the supreme achievements in literature.",
      itemPrice: 14.49,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91mftQtgAkL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Name of the Wind by Patrick Rothfuss",
      itemDescription:
        "The Name of the Wind, also referred to as The Kingkiller Chronicle: Day One, is a heroic fantasy novel written by American author Patrick Rothfuss. It is the first book in the ongoing fantasy trilogy The Kingkiller Chronicle, followed by The Wise Man's Fear. It was published on March 27, 2007, by DAW Books.",
      itemPrice: 9.89,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91b8oNwaV1L.jpg",
    }),
    InventoryItem.create({
      itemName: "Where the Crawdads Sing by Delia Owens",
      itemDescription:
        "Where the Crawdads Sing is a 2018 novel by American author Delia Owens. It has topped The New York Times Fiction Best Sellers of 2019 and The New York Times Fiction Best Sellers of 2020 for a combined 32 non-consecutive weeks. As of late January 2021, the book has spent 124 weeks on the best seller list.",
      itemPrice: 9.98,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81HA6TJ5K-L.jpg",
    }),
    InventoryItem.create({
      itemName: "Circe by Madeline Miller",
      itemDescription:
        "Circe is a 2018 novel by American writer Madeline Miller. Set during the Greek Heroic Age, it is an adaptation of various Greek myths, most notably the Odyssey, as told from the perspective of the witch Circe.",
      itemPrice: 15.99,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71fNP7F9p2L.jpg",
    }),
    InventoryItem.create({
      itemName: "Mistborn: The Final Empire by Brandon Sanderson",
      itemDescription:
        "Mistborn: The Final Empire, also known simply as Mistborn or The Final Empire, is a fantasy novel written by American author Brandon Sanderson. It was published on July 17, 2006, by Tor Books and is the first novel in the Mistborn trilogy, followed by The Well of Ascension in 2007 and The Hero of Ages in 2008.",
      itemPrice: 12.56,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81NGmugxgSL.jpg",
    }),
    InventoryItem.create({
      itemName: "Leviathan Wakes by James S. A. Corey",
      itemDescription:
        "Leviathan Wakes is a science fiction novel by James S. A. Corey, the pen name of Daniel Abraham and Ty Franck. It is the first book in the Expanse series, followed by Caliban's War, Abaddon's Gate and six other novels.",
      itemPrice: 17.53,
      itemImageUrl: "https://m.media-amazon.com/images/I/51+EaerSnvL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Blade Itself by Joe Abercrombie",
      itemDescription:
        "The Blade Itself is the first novel in The First Law Trilogy and was Joe Abercrombie's first novel. It was first published in May 2006 by Gollancz in the UK, with an American edition following from Pyr Books.",
      itemPrice: 16.24,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81-3XSUDT1L.jpg",
    }),
    InventoryItem.create({
      itemName: "Star Wars: Into the Dark (The High Republic) by Claudia Gray",
      itemDescription:
        "Star Wars: The High Republic: Into the Dark is a 2021 young adult Star Wars novel written by Claudia Gray as part of the Star Wars: The High Republic franchise taking place 200 years before the events of Star Wars: The Phantom Menace.",
      itemPrice: 10.19,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/519D7mQYiUL._SX331_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "The Institute by Stephen King",
      itemDescription:
        "The Institute is a science fiction-horror thriller novel by American author Stephen King, published on September 10, 2019, by Scribner. The book follows twelve-year-old genius Luke Ellis.",
      itemPrice: 13.93,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg",
    }),
    InventoryItem.create({
      itemName:
        "The Sixth Extinction: An Unnatural History by Elizabeth Kolbert",
      itemDescription:
        "The Sixth Extinction: An Unnatural History is a 2014 non-fiction book written by Elizabeth Kolbert and published by Henry Holt and Company. The book argues that the Earth is in the midst of a modern, man-made, sixth extinction.",
      itemPrice: 9.97,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/811HumtGpTL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Catcher in the Rye by J. D. Salinger",
      itemDescription:
        "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society. It has been translated widely.",
      itemPrice: 5.21,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
    }),
    InventoryItem.create({
      itemName: "Lord of the Flies by William Golding",
      itemDescription:
        "Lord of the Flies is a 1954 debut novel by Nobel Prize-winning British author William Golding. The book focuses on a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
      itemPrice: 5.99,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81WUAoL-wFL.jpg",
    }),
    InventoryItem.create({
      itemName: "Fahrenheit 451 by Ray Bradbury",
      itemDescription:
        'Fahrenheit 451 is a 1953 dystopian novel by American writer Ray Bradbury. Often regarded as one of his best works, the novel presents a future American society where books are outlawed and "firemen" burn any that are found.',
      itemPrice: 8.29,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71OFqSRFDgL.jpg",
    }),
    InventoryItem.create({
      itemName: "Little Women by Louisa May Alcott",
      itemDescription:
        "Little Women is a coming-of-age novel written by American novelist Louisa May Alcott. Originally published in two volumes in 1868 and 1869, Alcott wrote the book over several months at the request of her publisher.",
      itemPrice: 8.95,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91som6pnZhL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Count of Monte Cristo by Alexandre Dumas",
      itemDescription:
        "The Count of Monte Cristo is an adventure novel written by French author Alexandre Dumas completed in 1844. It is one of the author's more popular works, along with The Three Musketeers. Like many of his novels, it was expanded from plot outlines suggested by his collaborating ghostwriter Auguste Maquet.",
      itemPrice: 7.2,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41HNhXMV9tL._SX323_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "Don Quixote by Miguel de Cervantes",
      itemDescription:
        "Don Quixote is a Spanish novel by Miguel de Cervantes. Its full title is The Ingenious Gentleman Don Quixote of La Mancha It was originally published in two parts, in 1605 and 1615.",
      itemPrice: 11.69,
      itemImageUrl: "https://m.media-amazon.com/images/I/51iQq6ZYedL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Alchemist by Paulo Coelho",
      itemDescription:
        "The Alchemist is a novel by Brazilian author Paulo Coelho which was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.",
      itemPrice: 8.89,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51kcX5PpaZL._SX329_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "The Prophet by Kahlil Gibran",
      itemDescription:
        "The Prophet is a book of 26 prose poetry fables written in English by the Lebanese-American poet and writer Kahlil Gibran. It was originally published in 1923 by Alfred A. Knopf. It is Gibran's best known work.",
      itemPrice: 7.79,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91iIlD9xegL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Outsider by Stephen King",
      itemDescription:
        "The Outsider is a horror novel by the American author Stephen King. The novel was published by Scribner.",
      itemPrice: 7.53,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91YVPs88hjL.jpg",
    }),
    InventoryItem.create({
      itemName: "Devil in the White City",
      itemDescription:
        "The Devil in the White City: Murder, Magic, and Madness at the Fair That Changed America is a 2003 historical non-fiction book by Erik Larson presented in a novelistic style.",
      itemPrice: 10.58,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91oNGDxyR0L.jpg",
    }),
    InventoryItem.create({
      itemName: "IT by Stephen King",
      itemDescription:
        "It is a 1986 horror novel by American author Stephen King. It was his 22nd book and his 17th novel written under his own name. The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey.",
      itemPrice: 15.98,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71tFhdcC0XL.jpg",
    }),
    InventoryItem.create({
      itemName: "NOS4A2 by Joe King",
      itemDescription:
        "NOS4A2 is the third novel by American author Joe Hill, son of authors Stephen and Tabitha King. The book was published on April 30, 2013 through William Morrow and Company, and has since been adapted to a television series.",
      itemPrice: 10.56,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/714rjAuY8DL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Wise Man's Fear by Patrick Rothfus",
      itemDescription:
        "The Wise Man's Fear is a fantasy novel written by American author Patrick Rothfuss and the second volume in The Kingkiller Chronicle. It was published on March 1, 2011, by DAW Books. It is the sequel to 2007's The Name of the Wind.",
      itemPrice: 25.95,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81NX-69L22L.jpg",
    }),
    InventoryItem.create({
      itemName: "The Subtle Art of Not Giving a F*ck by Mark Manson",
      itemDescription:
        "The Subtle Art of Not Giving a Fuck: A Counterintuitive Approach to Living a Good Life is the second book by blogger and author Mark Manson. In it, Manson argues that life's struggles give it meaning, and that the mindless positivity of typical self-help books is neither practical nor helpful.",
      itemPrice: 15.76,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
    }),
    InventoryItem.create({
      itemName: "Siddhartha by Herman Hesse",
      itemDescription:
        "Siddhartha: An Indian Poem is a 1922 novel by Hermann Hesse that deals with the spiritual journey of self-discovery of a man named Siddhartha during the time of the Gautama Buddha. The book, Hesse's 9th novel, was written in German, in a simple, lyrical style.",
      itemPrice: 6.24,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71o4Wi1CRsL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Lies of Locke Lamora bu Scott Lynch",
      itemDescription:
        "The Lies of Locke Lamora is a 2006 fantasy novel by American writer Scott Lynch, the first book of the Gentleman Bastard series. Elite con artists calling themselves the \"Gentleman Bastards\" rob the rich of the city of Camorr, based on late medieval Venice but on an unnamed world.",
      itemPrice: 14.62,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91pbvnDj5FL.jpg",
    }),
    InventoryItem.create({
      itemName: "Dune by Frank Herbert",
      itemDescription:
        "Dune is a 1965 science fiction novel by American author Frank Herbert, originally published as two separate serials in Analog magazine. It tied with Roger Zelazny's This Immortal for the Hugo Award in 1966 and it won the inaugural Nebula Award for Best Novel. It is the first installment of the Dune saga.",
      itemPrice: 22.80,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41+L9Q+rCLL._SX277_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "The Picture of Dorian Gray by Oscar Wilde",
      itemDescription:
        "The Picture of Dorian Gray is a philosophical novel by Oscar Wilde. A shorter novella-length version was published in the July 1890 issue of the American periodical Lippincott's Monthly Magazine. Wilde then expanded that text into a novel published as a book in April 1891.",
      itemPrice: 8.69,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71Yl9WYd4+S.jpg",
    }),
    InventoryItem.create({
      itemName: "Ready Player One by Ernest Cline",
      itemDescription:
        "Ready Player One is a 2011 science fiction novel, and the debut novel of American author Ernest Cline. The story, set in a dystopia in 2045, follows protagonist Wade Watts on his search for an Easter egg in a worldwide virtual reality game, the discovery of which would lead him to inherit the game creator's fortune.",
      itemPrice: 11.00,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/9193hRad9yL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Little Prince by Antoine de Saint-Exupéry",
      itemDescription:
        "The Little Prince is a novella by French aristocrat, writer, and military aviator Antoine de Saint-Exupéry.",
      itemPrice: 6.81,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71OZY035QKL.jpg",
    }),
    InventoryItem.create({
      itemName: "Jonathan Livingston Seagull by Richard Bach",
      itemDescription:
        "Jonathan Livingston Seagull, written by American author Richard Bach and illustrated by Russell Munson, is a fable in novella form about a seagull who is trying to learn about life and flight, and a homily about self-perfection.",
      itemPrice: 13.50,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71Nomlj8kCL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Devil Wears Prada by Lauren Weisberger",
      itemDescription:
        "The Devil Wears Prada is a 2003 novel by Lauren Weisberger about a young woman who is hired as a personal assistant to a powerful fashion magazine editor, a job that becomes nightmarish as she struggles to keep up with her boss's grueling schedule and demeaning demands.",
      itemPrice: 12.95,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/51zn-7EUruS.jpg",
    }),
    InventoryItem.create({
      itemName: "A Game of Thrones by George R. R. Martin",
      itemDescription:
        "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by the American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award.",
      itemPrice: 26.99,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91dSMhdIzTL.jpg",
    }),
    InventoryItem.create({
      itemName: "A Monster Calls by Patrick Ness",
      itemDescription:
        "A Monster Calls is a low fantasy novel written for young adults by Patrick Ness illustrated by Jim Kay and published by Walker in 2011. Set in present-day England, it features a boy who struggles to cope with the consequences of his mother's illness.",
      itemPrice: 8.49,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/A1Oo8yFPILL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Way of Kings by Brandon Sanderson",
      itemDescription:
        "The Way of Kings is an epic fantasy novel written by American author Brandon Sanderson and the first book in The Stormlight Archive series. The novel was published on August 31, 2010, by Tor Books. The Way of Kings consists of one prelude, one prologue, 75 chapters, an epilogue and 9 interludes.",
      itemPrice: 8.19,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91KzZWpgmyL.jpg",
    }),
    InventoryItem.create({
      itemName: "Shōgun by James Clavell",
      itemDescription:
        "Shōgun is a 1975 novel by James Clavell. It is the first novel of the author's Asian Saga. A major best-seller, by 1990 the book had sold 15 million copies worldwide.",
      itemPrice: 15.82,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81qN5Nmu6uL.jpg",
    }),
    InventoryItem.create({
      itemName: "Pride and Prejudice by Jane Austen",
      itemDescription:
        "Pride and Prejudice is an 1813 novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
      itemPrice: 5.95,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Iron King by Julie Kagawa",
      itemDescription:
        "Meghan Chase has a secret destiny – one she could never have imaginedMy name is Meghan Chase. In less than twenty–four hours I'll be sixteen.",
      itemPrice: 10.69,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81AA35r7YLL.jpg",
    }),
  ]);

  console.log(`seeded ${users.length} users`.brightGreen);
  console.log(`seeded ${InventoryItem.length} inventory items`.brightGreen);
  console.log(`seeded successfully`.brightBlue);

  const purchases = await Promise.all([
    Purchase.create({
      userId: 1,
      status: "cart",
    }),
    Purchase.create({
      userId: 1,
      status: "purchased",
    }),
    Purchase.create({
      userId: 2,
      status: "cart",
    }),
    Purchase.create({
      userId: 2,
      status: "purchased",
    }),
  ]);

  const shoppingItems = await Promise.all([
    ShoppingItem.create({
      quantity: 2,
      inventoryItemId: 1,
      purchaseId: 1,
    }),
    ShoppingItem.create({
      quantity: 1,
      inventoryItemId: 2,
      purchaseId: 1,
    }),
    ShoppingItem.create({
      quantity: 1,
      inventoryItemId: 1,
      purchaseId: 2,
    }),
    ShoppingItem.create({
      quantity: 1,
      inventoryItemId: 4,
      purchaseId: 2,
    }),
    ShoppingItem.create({
      quantity: 1,
      inventoryItemId: 5,
      purchaseId: 3,
    }),
    ShoppingItem.create({
      quantity: 2,
      inventoryItemId: 6,
      purchaseId: 3,
    }),
    ShoppingItem.create({
      quantity: 1,
      inventoryItemId: 5,
      purchaseId: 4,
    }),
    ShoppingItem.create({
      quantity: 2,
      inventoryItemId: 8,
      purchaseId: 4,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${InventoryItem.length} inventory items`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...".brightBlue);
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection".brightGreen);
    await db.close();
    console.log("db connection closed".brightGreen);
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
