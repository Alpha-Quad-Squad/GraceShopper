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
    User.create({ username: "cody", password: "123", isAdmin: false, email: 'cody@gh.com' }),
    User.create({ username: "murphy", password: "123", isAdmin: true, email: 'murphy@gh.com' }),
    User.create({ username: "lucy", password: "123", isAdmin: false, email: 'lucy@gh.com' }),
    User.create({ username: "john", password: "123", isAdmin: false, email: 'john@gh.com' }),
    User.create({ username: "stacie", password: "123", isAdmin: false, email: 'stacie@gh.com' }),
    User.create({ username: "kim", password: "123", isAdmin: true, email: 'kim@gh.com' }),
    User.create({ username: "eric", password: "123", isAdmin: false, email: 'eric@gh.com' }),
    User.create({ username: "mike", password: "123", isAdmin: true, email: 'mike@gh.com' }),
    User.create({ username: "jenn", password: "123", isAdmin: false, email: 'jenn@gh.com' }),
    User.create({ username: "tom", password: "123", isAdmin: false, email: 'tom@gh.com' }),
    User.create({ username: "lisa", password: "123", isAdmin: true, email: 'lisa@gh.com' }),
  ]);

  // Creating Inventory Items
  const inventoryItems = await Promise.all([
    InventoryItem.create({
      itemName: "The Last Wish by Andrezej Sapkowski",
      itemDescription:
        "The Last Wish is the first of the two collections of short stories preceding the main Witcher Saga, written by Polish fantasy writer Andrzej Sapkowski. The first Polish edition was published in 1993 and the first English edition was first published in 2007.",
      itemPrice: 899,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81DRSc6YPjS.jpg",
    }),
    InventoryItem.create({
      itemName: "Kafka On The Shore by Haruki Murakami",
      itemDescription:
        'Kafka on the Shore is a 2002 novel by Japanese author Haruki Murakami. Its 2005 English translation was among "The 10 Best Books of 2005" from The New York Times and received the World Fantasy Award for 2006.',
      itemPrice: 1369,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81zvseHim4L.jpg",
    }),
    InventoryItem.create({
      itemName: "100 Years of Solitude by Gabriel García Márquez",
      itemDescription:
        "One Hundred Years of Solitude is a 1967 novel by Colombian author Gabriel García Márquez that tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The novel is often cited as one of the supreme achievements in literature.",
      itemPrice: 1449,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91mftQtgAkL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Name of the Wind by Patrick Rothfuss",
      itemDescription:
        "The Name of the Wind, also referred to as The Kingkiller Chronicle: Day One, is a heroic fantasy novel written by American author Patrick Rothfuss. It is the first book in the ongoing fantasy trilogy The Kingkiller Chronicle, followed by The Wise Man's Fear. It was published on March 27, 2007, by DAW Books.",
      itemPrice: 989,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91b8oNwaV1L.jpg",
    }),
    InventoryItem.create({
      itemName: "Where the Crawdads Sing by Delia Owens",
      itemDescription:
        "Where the Crawdads Sing is a 2018 novel by American author Delia Owens. It has topped The New York Times Fiction Best Sellers of 2019 and The New York Times Fiction Best Sellers of 2020 for a combined 32 non-consecutive weeks. As of late January 2021, the book has spent 124 weeks on the best seller list.",
      itemPrice: 998,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81HA6TJ5K-L.jpg",
    }),
    InventoryItem.create({
      itemName: "Circe by Madeline Miller",
      itemDescription:
        "Circe is a 2018 novel by American writer Madeline Miller. Set during the Greek Heroic Age, it is an adaptation of various Greek myths, most notably the Odyssey, as told from the perspective of the witch Circe.",
      itemPrice: 1599,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71fNP7F9p2L.jpg",
    }),
    InventoryItem.create({
      itemName: "Mistborn: The Final Empire by Brandon Sanderson",
      itemDescription:
        "Mistborn: The Final Empire, also known simply as Mistborn or The Final Empire, is a fantasy novel written by American author Brandon Sanderson. It was published on July 17, 2006, by Tor Books and is the first novel in the Mistborn trilogy, followed by The Well of Ascension in 2007 and The Hero of Ages in 2008.",
      itemPrice: 1256,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81NGmugxgSL.jpg",
    }),
    InventoryItem.create({
      itemName: "Leviathan Wakes by James S. A. Corey",
      itemDescription:
        "Leviathan Wakes is a science fiction novel by James S. A. Corey, the pen name of Daniel Abraham and Ty Franck. It is the first book in the Expanse series, followed by Caliban's War, Abaddon's Gate and six other novels.",
      itemPrice: 1753,
      itemImageUrl: "https://m.media-amazon.com/images/I/51+EaerSnvL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Blade Itself by Joe Abercrombie",
      itemDescription:
        "The Blade Itself is the first novel in The First Law Trilogy and was Joe Abercrombie's first novel. It was first published in May 2006 by Gollancz in the UK, with an American edition following from Pyr Books.",
      itemPrice: 1624,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81-3XSUDT1L.jpg",
    }),
    InventoryItem.create({
      itemName: "Star Wars: Into the Dark (The High Republic) by Claudia Gray",
      itemDescription:
        "Star Wars: The High Republic: Into the Dark is a 2021 young adult Star Wars novel written by Claudia Gray as part of the Star Wars: The High Republic franchise taking place 200 years before the events of Star Wars: The Phantom Menace.",
      itemPrice: 1019,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/519D7mQYiUL._SX331_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "The Institute by Stephen King",
      itemDescription:
        "The Institute is a science fiction-horror thriller novel by American author Stephen King, published on September 10, 2019, by Scribner. The book follows twelve-year-old genius Luke Ellis.",
      itemPrice: 1393,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81pA6-hv+2L.jpg",
    }),
    InventoryItem.create({
      itemName:
        "The Sixth Extinction: An Unnatural History by Elizabeth Kolbert",
      itemDescription:
        "The Sixth Extinction: An Unnatural History is a 2014 non-fiction book written by Elizabeth Kolbert and published by Henry Holt and Company. The book argues that the Earth is in the midst of a modern, man-made, sixth extinction.",
      itemPrice: 997,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/811HumtGpTL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Catcher in the Rye by J. D. Salinger",
      itemDescription:
        "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society. It has been translated widely.",
      itemPrice: 521,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
    }),
    InventoryItem.create({
      itemName: "Lord of the Flies by William Golding",
      itemDescription:
        "Lord of the Flies is a 1954 debut novel by Nobel Prize-winning British author William Golding. The book focuses on a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
      itemPrice: 599,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81WUAoL-wFL.jpg",
    }),
    InventoryItem.create({
      itemName: "Fahrenheit 451 by Ray Bradbury",
      itemDescription:
        'Fahrenheit 451 is a 1953 dystopian novel by American writer Ray Bradbury. Often regarded as one of his best works, the novel presents a future American society where books are outlawed and "firemen" burn any that are found.',
      itemPrice: 829,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71OFqSRFDgL.jpg",
    }),
    InventoryItem.create({
      itemName: "Little Women by Louisa May Alcott",
      itemDescription:
        "Little Women is a coming-of-age novel written by American novelist Louisa May Alcott. Originally published in two volumes in 1868 and 1869, Alcott wrote the book over several months at the request of her publisher.",
      itemPrice: 895,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91som6pnZhL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Count of Monte Cristo by Alexandre Dumas",
      itemDescription:
        "The Count of Monte Cristo is an adventure novel written by French author Alexandre Dumas completed in 1844. It is one of the author's more popular works, along with The Three Musketeers. Like many of his novels, it was expanded from plot outlines suggested by his collaborating ghostwriter Auguste Maquet.",
      itemPrice: 720,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41HNhXMV9tL._SX323_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "Don Quixote by Miguel de Cervantes",
      itemDescription:
        "Don Quixote is a Spanish novel by Miguel de Cervantes. Its full title is The Ingenious Gentleman Don Quixote of La Mancha It was originally published in two parts, in 1605 and 1615.",
      itemPrice: 1169,
      itemImageUrl: "https://m.media-amazon.com/images/I/51iQq6ZYedL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Alchemist by Paulo Coelho",
      itemDescription:
        "The Alchemist is a novel by Brazilian author Paulo Coelho which was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.",
      itemPrice: 889,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51kcX5PpaZL._SX329_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "The Prophet by Kahlil Gibran",
      itemDescription:
        "The Prophet is a book of 26 prose poetry fables written in English by the Lebanese-American poet and writer Kahlil Gibran. It was originally published in 1923 by Alfred A. Knopf. It is Gibran's best known work.",
      itemPrice: 779,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91iIlD9xegL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Outsider by Stephen King",
      itemDescription:
        "The Outsider is a horror novel by the American author Stephen King. The novel was published by Scribner.",
      itemPrice: 753,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91YVPs88hjL.jpg",
    }),
    InventoryItem.create({
      itemName: "Devil in the White City",
      itemDescription:
        "The Devil in the White City: Murder, Magic, and Madness at the Fair That Changed America is a 2003 historical non-fiction book by Erik Larson presented in a novelistic style.",
      itemPrice: 1058,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91oNGDxyR0L.jpg",
    }),
    InventoryItem.create({
      itemName: "IT by Stephen King",
      itemDescription:
        "It is a 1986 horror novel by American author Stephen King. It was his 22nd book and his 17th novel written under his own name. The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey.",
      itemPrice: 1598,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71tFhdcC0XL.jpg",
    }),
    InventoryItem.create({
      itemName: "NOS4A2 by Joe King",
      itemDescription:
        "NOS4A2 is the third novel by American author Joe Hill, son of authors Stephen and Tabitha King. The book was published on April 30, 2013 through William Morrow and Company, and has since been adapted to a television series.",
      itemPrice: 1056,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/714rjAuY8DL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Wise Man's Fear by Patrick Rothfus",
      itemDescription:
        "The Wise Man's Fear is a fantasy novel written by American author Patrick Rothfuss and the second volume in The Kingkiller Chronicle. It was published on March 1, 2011, by DAW Books. It is the sequel to 2007's The Name of the Wind.",
      itemPrice: 2595,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81NX-69L22L.jpg",
    }),
    InventoryItem.create({
      itemName: "The Subtle Art of Not Giving a F*ck by Mark Manson",
      itemDescription:
        "The Subtle Art of Not Giving a Fuck: A Counterintuitive Approach to Living a Good Life is the second book by blogger and author Mark Manson. In it, Manson argues that life's struggles give it meaning, and that the mindless positivity of typical self-help books is neither practical nor helpful.",
      itemPrice: 1576,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
    }),
    InventoryItem.create({
      itemName: "Siddhartha by Herman Hesse",
      itemDescription:
        "Siddhartha: An Indian Poem is a 1922 novel by Hermann Hesse that deals with the spiritual journey of self-discovery of a man named Siddhartha during the time of the Gautama Buddha. The book, Hesse's 9th novel, was written in German, in a simple, lyrical style.",
      itemPrice: 624,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71o4Wi1CRsL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Lies of Locke Lamora bu Scott Lynch",
      itemDescription:
        "The Lies of Locke Lamora is a 2006 fantasy novel by American writer Scott Lynch, the first book of the Gentleman Bastard series. Elite con artists calling themselves the \"Gentleman Bastards\" rob the rich of the city of Camorr, based on late medieval Venice but on an unnamed world.",
      itemPrice: 1462,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91pbvnDj5FL.jpg",
    }),
    InventoryItem.create({
      itemName: "Dune by Frank Herbert",
      itemDescription:
        "Dune is a 1965 science fiction novel by American author Frank Herbert, originally published as two separate serials in Analog magazine. It tied with Roger Zelazny's This Immortal for the Hugo Award in 1966 and it won the inaugural Nebula Award for Best Novel. It is the first installment of the Dune saga.",
      itemPrice: 2280,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41+L9Q+rCLL._SX277_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "The Picture of Dorian Gray by Oscar Wilde",
      itemDescription:
        "The Picture of Dorian Gray is a philosophical novel by Oscar Wilde. A shorter novella-length version was published in the July 1890 issue of the American periodical Lippincott's Monthly Magazine. Wilde then expanded that text into a novel published as a book in April 1891.",
      itemPrice: 869,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71Yl9WYd4+S.jpg",
    }),
    InventoryItem.create({
      itemName: "Ready Player One by Ernest Cline",
      itemDescription:
        "Ready Player One is a 2011 science fiction novel, and the debut novel of American author Ernest Cline. The story, set in a dystopia in 2045, follows protagonist Wade Watts on his search for an Easter egg in a worldwide virtual reality game, the discovery of which would lead him to inherit the game creator's fortune.",
      itemPrice: 1100,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/9193hRad9yL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Little Prince by Antoine de Saint-Exupéry",
      itemDescription:
        "The Little Prince is a novella by French aristocrat, writer, and military aviator Antoine de Saint-Exupéry.",
      itemPrice: 681,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71OZY035QKL.jpg",
    }),
    InventoryItem.create({
      itemName: "Jonathan Livingston Seagull by Richard Bach",
      itemDescription:
        "Jonathan Livingston Seagull, written by American author Richard Bach and illustrated by Russell Munson, is a fable in novella form about a seagull who is trying to learn about life and flight, and a homily about self-perfection.",
      itemPrice: 1350,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71Nomlj8kCL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Devil Wears Prada by Lauren Weisberger",
      itemDescription:
        "The Devil Wears Prada is a 2003 novel by Lauren Weisberger about a young woman who is hired as a personal assistant to a powerful fashion magazine editor, a job that becomes nightmarish as she struggles to keep up with her boss's grueling schedule and demeaning demands.",
      itemPrice: 1295,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/51zn-7EUruS.jpg",
    }),
    InventoryItem.create({
      itemName: "A Game of Thrones by George R. R. Martin",
      itemDescription:
        "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by the American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award.",
      itemPrice: 2699,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91dSMhdIzTL.jpg",
    }),
    InventoryItem.create({
      itemName: "A Monster Calls by Patrick Ness",
      itemDescription:
        "A Monster Calls is a low fantasy novel written for young adults by Patrick Ness illustrated by Jim Kay and published by Walker in 2011. Set in present-day England, it features a boy who struggles to cope with the consequences of his mother's illness.",
      itemPrice: 849,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/A1Oo8yFPILL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Way of Kings by Brandon Sanderson",
      itemDescription:
        "The Way of Kings is an epic fantasy novel written by American author Brandon Sanderson and the first book in The Stormlight Archive series. The novel was published on August 31, 2010, by Tor Books. The Way of Kings consists of one prelude, one prologue, 75 chapters, an epilogue and 9 interludes.",
      itemPrice: 819,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91KzZWpgmyL.jpg",
    }),
    InventoryItem.create({
      itemName: "Shōgun by James Clavell",
      itemDescription:
        "Shōgun is a 1975 novel by James Clavell. It is the first novel of the author's Asian Saga. A major best-seller, by 1990 the book had sold 15 million copies worldwide.",
      itemPrice: 1582,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81qN5Nmu6uL.jpg",
    }),
    InventoryItem.create({
      itemName: "Pride and Prejudice by Jane Austen",
      itemDescription:
        "Pride and Prejudice is an 1813 novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
      itemPrice: 595,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Iron King by Julie Kagawa",
      itemDescription:
        "Meghan Chase has a secret destiny – one she could never have imaginedMy name is Meghan Chase. In less than twenty–four hours I'll be sixteen.",
      itemPrice: 1069,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81AA35r7YLL.jpg",
    }),
    InventoryItem.create({
      itemName: "Nineteen Eighty-Four by George Orwell",
      itemDescription:
        "Nineteen Eighty-Four is a dystopian social science fiction novel and cautionary tale written by English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
      itemPrice: 1045,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91Q56n9K99L.jpg",
    }),
    InventoryItem.create({
      itemName: "Catch-22 by Joseph Heller",
      itemDescription:
        "Catch-22 is a satirical war novel by American author Joseph Heller. He began writing it in 1953; the novel was first published in 1961.",
      itemPrice: 1222,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71CHQmWDBHL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Lord of the Rings by J.R.R. Tolkien",
      itemDescription:
        "The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, intended to be Earth at some distant time in the past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work.",
      itemPrice: 1789,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/51bJhsl5VmL.jpg",
    }),
    InventoryItem.create({
      itemName: "Jane Eyre by Charlotte Brontë",
      itemDescription:
        "Jane Eyre is a novel by English writer Charlotte Brontë, published under the pen name \"Currer Bell\", on 16 October 1847, by Smith, Elder & Co. of London. The first American edition was published the following year by Harper & Brothers of New York.",
      itemPrice: 899,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91zU70Aw9IS.jpg",
    }),
    InventoryItem.create({
      itemName: "To Kill a Mockingbird by Harper Lee",
      itemDescription:
        "To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.",
      itemPrice: 1599,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71FxgtFKcQL.jpg",
    }),
    InventoryItem.create({
      itemName: "Gone with the Wind by Margaret Mitchell",
      itemDescription:
        "Gone with the Wind is a novel by American writer Margaret Mitchell, first published in 1936. The story is set in Clayton County and Atlanta, both in Georgia, during the American Civil War and Reconstruction Era.",
      itemPrice: 1479,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51pZagJtHdL._SX308_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "Wuthering Heights by Emily Brontë",
      itemDescription:
        "Wuthering Heights is an 1847 novel by Emily Brontë, initially published under the pseudonym Ellis Bell. It concerns two families of the landed gentry living on the West Yorkshire moors, the Earnshaws and the Lintons, and their turbulent relationships with Earnshaw's adopted son, Heathcliff.",
      itemPrice: 619,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71ogwlE3YNL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Sound and the Fury by William Faulkner",
      itemDescription:
        "The Sound and the Fury is a novel by the American author William Faulkner. It employs several narrative styles, including stream of consciousness. Published in 1929, The Sound and the Fury was Faulkner's fourth novel, and was not immediately successful.",
      itemPrice: 1349,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/51Az52fa1zL.jpg",
    }),
    InventoryItem.create({
      itemName: "Crime and Punishment by Fyodor Dostoyevsky",
      itemDescription:
        "Crime and Punishment is a novel by the Russian author Fyodor Dostoevsky. It was first published in the literary journal The Russian Messenger in twelve monthly installments during 1866. It was later published in a single volume.",
      itemPrice: 1595,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81b6e-dc41L.jpg",
    }),
    InventoryItem.create({
      itemName: "The Lion, the Witch, and the Wardrobe by C.S. Lewis",
      itemDescription:
        "The Lion, the Witch and the Wardrobe is a fantasy novel for children by C. S. Lewis, published by Geoffrey Bles in 1950. It is the first published and best known of seven novels in The Chronicles of Narnia. Among all the author's books, it is also the most widely held in libraries.",
      itemPrice: 2137,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51erHMLhIzL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Hobbit by J.R.R. Tolkien",
      itemDescription:
        "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published in 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
      itemPrice: 1292,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/710+HcoP38L.jpg",
    }),
    InventoryItem.create({
      itemName: "Harry Potter and the Sorcerer's Stone by J.K. Rowling",
      itemDescription:
        "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling.",
      itemPrice: 698,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51DF6ZR8G7L._SX329_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "The Adventures of Huckleberry Finn by Mark Twain",
      itemDescription:
        "Adventures of Huckleberry Finn or as it is known in more recent editions, The Adventures of Huckleberry Finn, is a novel by American author Mark Twain, which was first published in the United Kingdom in December 1884 and in the United States in February 1885.",
      itemPrice: 799,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71iBE54utML.jpg",
    }),
    InventoryItem.create({
      itemName: "Moby-Dick by Herman Melville",
      itemDescription:
        "Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge on Moby Dick, the giant white sperm whale that on the ship's previous voyage bit off Ahab's leg at the knee.",
      itemPrice: 1345,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41VnFKC9srL._SX346_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "Emma by Jane Austen",
      itemDescription:
        "Emma, by Jane Austen, is a novel about youthful hubris and romantic misunderstandings. It is set in the fictional country village of Highbury and the surrounding estates of Hartfield, Randalls and Donwell Abbey, and involves the relationships among people from a small number of families.",
      itemPrice: 751,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61HsxPxHcCL.jpg",
    }),
    InventoryItem.create({
      itemName: "Of Mice and Men by John Steinbeck",
      itemDescription:
        "Of Mice and Men is a novella written by John Steinbeck. Published in 1937, it narrates the experiences of George Milton and Lennie Small, two displaced migrant ranch workers, who move from place to place in California in search of new job opportunities during the Great Depression in the United States.",
      itemPrice: 2030,
      itemImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a8/Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg",
    }),
    InventoryItem.create({
      itemName: "David Copperfield by Charles Dickens",
      itemDescription:
        "The Personal History, Adventures, Experience and Observation of David Copperfield the Younger of Blunderstone Rookery (Which He Never Meant to Publish on Any Account), commonly known as David Copperfield,[N 1] is a novel in the bildungsroman genre by Charles Dickens, narrated by the eponymous David Copperfield, detailing his adventures in his journey from infancy to maturity. It was first published as a serial in 1849 and 1850, and as a book in 1850.",
      itemPrice: 999,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/51tlnVxlLqL.jpg",
    }),
    InventoryItem.create({
      itemName: "A Clockwork Orange by Anthony Burgess",
      itemDescription:
        "A Clockwork Orange is a dystopian satirical black comedy novel by English writer Anthony Burgess, published in 1962. It is set in a near-future society that has a youth subculture of extreme violence.",
      itemPrice: 1389,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51FTcHNhQqL.jpg",
    }),
    InventoryItem.create({
      itemName: "His Dark Materials by Philip Pullman",
      itemDescription:
        "His Dark Materials is a trilogy of fantasy novels by Philip Pullman consisting of Northern Lights, The Subtle Knife, and The Amber Spyglass. It follows the coming of age of two children, Lyra Belacqua and Will Parry, as they wander through a series of parallel universes.",
      itemPrice: 1559,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91zAe4EXmjL.jpg",
    }),
    InventoryItem.create({
      itemName: "Frankenstein by Mary Shelley",
      itemDescription:
        "Frankenstein; or, The Modern Prometheus is an 1818 novel written by English author Mary Shelley. Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment.",
      itemPrice: 779,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81z7E0uWdtL.jpg",
    }),
    InventoryItem.create({
      itemName: "Charlotte's Web by E.B White",
      itemDescription:
        "Charlotte's Web is a book of children's literature by American author E. B. White and illustrated by Garth Williams; it was published on October 15, 1952, by Harper & Brothers. The novel tells the story of a livestock pig named Wilbur and his friendship with a barn spider named Charlotte.",
      itemPrice: 1599,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61+3z1o4oUL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Portrait of a Lady by Jenry James",
      itemDescription:
        "The Portrait of a Lady is a novel by Henry James, first published as a serial in The Atlantic Monthly and Macmillan's Magazine in 1880–81 and then as a book in 1881. It is one of James's most popular novels and is regarded by critics as one of his finest.",
      itemPrice: 1099,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91rOmcxdxWL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Color Purple by Alice Walker",
      itemDescription:
        "The Color Purple is a 1982 epistolary novel by American author Alice Walker which won the 1983 Pulitzer Prize for Fiction and the National Book Award for Fiction. It was later adapted into a film and musical of the same name.",
      itemPrice: 1299,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71f6DRbcrsL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Stand by Stephen King",
      itemDescription:
        "The Stand is a post-apocalyptic dark fantasy novel written by American author Stephen King and first published in 1978 by Doubleday.",
      itemPrice: 975,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81c8No6mSPL.jpg",
    }),
    InventoryItem.create({
      itemName: "One Flew Over the Cuckoo's Nest by Ken Kesey",
      itemDescription:
        "One Flew Over the Cuckoo's Nest is a novel written by Ken Kesey and published in 1962. Set in an Oregon psychiatric hospital, the narrative serves as a study of institutional processes and the human mind; including a critique of psychiatry, and a tribute to individualistic principles.",
      itemPrice: 1099,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91QerkARMLL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Stranger by Albert Camus",
      itemDescription:
        "The Stranger, also published in English as The Outsider, is a 1942 novella by French author Albert Camus. Its theme and outlook are often cited as examples of Camus' philosophy, absurdism, coupled with existentialism; though Camus personally rejected the latter label.",
      itemPrice: 639,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81GjCVSEDAL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Scarlet Letter by Nathaniel Hawthorne",
      itemDescription:
        "The Scarlet Letter: A Romance is a work of historical fiction by American author Nathaniel Hawthorne, published in 1850.",
      itemPrice: 745,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41F2W3Z9s6S._SX331_BO1,204,203,200_.jpg",
    }),
    InventoryItem.create({
      itemName: "Love in the Time of Cholera by Gabriel Garcia Marquez",
      itemDescription:
        "Love in the Time of Cholera is a novel by Colombian Nobel prize winning author Gabriel García Márquez. The novel was first published in Spanish in 1985. Alfred A. Knopf published an English translation in 1988.",
      itemPrice: 1024,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81OWK6olsoL.jpg",
    }),
    InventoryItem.create({
      itemName: "Dracula by Bram Stoker",
      itemDescription:
        "Dracula is a novel by Bram Stoker, published in 1897. As an epistolary novel, the narrative is related through letters, diary entries, and newspaper articles. It has no single protagonist, but opens with solicitor Jonathan Harker taking a business trip to stay at the castle of a Transylvanian noble, Count Dracula.",
      itemPrice: 999,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91wOUFZCE+L.jpg",
    }),
    InventoryItem.create({
      itemName: "The Kite Runner by Khaled Hosseini",
      itemDescription:
        "The Kite Runner is the first novel by Afghan-American author Khaled Hosseini. Published in 2003 by Riverhead Books, it tells the story of Amir, a young boy from the Wazir Akbar Khan district of Kabul.",
      itemPrice: 1050,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61hxlW+vz7L.jpg",
    }),
    InventoryItem.create({
      itemName: "The Fountainhead by Ayn Rand",
      itemDescription:
        "The Fountainhead is a 1943 novel by Russian-American author Ayn Rand, her first major literary success. The novel's protagonist, Howard Roark, is an intransigent young architect, who battles against conventional standards and refuses to compromise with an architectural establishment unwilling to accept innovation.",
      itemPrice: 764,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91yszMADa7L.jpg",
    }),
    InventoryItem.create({
      itemName: "Jude the Obscure by Thomas Hardy",
      itemDescription:
        "Jude the Obscure is a novel by Thomas Hardy, which began as a magazine serial in December 1894 and was first published in book form in 1895. It is Hardy's last completed novel. The protagonist, Jude Fawley, is a working-class young man; he is a stonemason who dreams of becoming a scholar.",
      itemPrice: 999,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71NlZzEIUEL.jpg",
    }),
    InventoryItem.create({
      itemName: "Their Eyes Were Watching God by Zora Neale Hurston",
      itemDescription:
        "Their Eyes Were Watching God is a 1937 novel by American writer Zora Neale Hurston. It is considered a classic of the Harlem Renaissance, and Hurston's best known work.",
      itemPrice: 1549,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91qvx7zE7YL.jpg",
    }),
    InventoryItem.create({
      itemName: "Finnegans Wake by James Joyce",
      itemDescription:
        "Finnegans Wake is a novel by Irish writer James Joyce. It has been called \"a work of fiction which combines a body of fables ... with the work of analysis and deconstruction\". It is significant for its experimental style and reputation as one of the most difficult works in the Western canon.",
      itemPrice: 2099,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/A1wIMapmpoL.jpg",
    }),
    InventoryItem.create({
      itemName: "Women in Love by D.H. Lawrence",
      itemDescription:
        "Women in Love is a novel by English author D. H. Lawrence. It is a sequel to his earlier novel The Rainbow, and follows the continuing loves and lives of the Brangwen sisters, Gudrun and Ursula. Gudrun Brangwen, an artist, pursues a destructive relationship with Gerald Crich, an industrialist.",
      itemPrice: 1199,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/41BenSunWqL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Secret Garden by Frances Hodgson Burnett",
      itemDescription:
        "The Secret Garden is a novel by Frances Hodgson Burnett first published in book form in 1911, after serialisation in The American Magazine. Set in England, it is one of Burnett's most popular novels and seen as a classic of English children's literature. Several stage and film adaptations have been made.",
      itemPrice: 1895,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91qOXqI3aQL.jpg",
    }),
    InventoryItem.create({
      itemName: "Gulliver's Travels by Jonathan Swift",
      itemDescription:
        "Gulliver's Travels, or Travels into Several Remote Nations of the World. In Four Parts. By Lemuel Gulliver, First a Surgeon, and then a Captain of Several Ships is a 1726 prose satire by the Irish writer and clergyman Jonathan Swift, satirising both human nature and the \"travellers' tales\" literary subgenre.",
      itemPrice: 1495,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/813YyI2mdmL.jpg",
    }),
    InventoryItem.create({
      itemName: "Blood Meridian by Cormac McCarthy",
      itemDescription:
        "Blood Meridian or The Evening Redness in the West is a 1985 epic novel by American author Cormac McCarthy, classified under the Western, or sometimes the anti-Western, genre. McCarthy's fifth book, it was published by Random House.",
      itemPrice: 999,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/A1l6F+A98ZL.jpg",
    }),
    InventoryItem.create({
      itemName: "Herzog by Saul Bellow",
      itemDescription:
        "Herzog is a 1964 novel by Saul Bellow, composed in part of letters from the protagonist Moses E. Herzog. It won the U.S. National Book Award for Fiction and the Prix International. In 2005, Time magazine named it one of the 100 best novels in the English language since Time's founding in 1923.",
      itemPrice: 6567,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/61llC0iw02L._AC_SY679_.jpg",
    }),
    InventoryItem.create({
      itemName: "The Prime of Miss Jean Brody by Muriel Spark",
      itemDescription:
        "The Prime of Miss Jean Brodie is a novel by Muriel Spark, the best known of her works. It was first published in The New Yorker magazine and was published as a book by Macmillan in 1961.",
      itemPrice: 1169,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/710PjPr01wL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Crying of Lot 49 by Thomas Pynchon",
      itemDescription:
        "The Crying of Lot 49 is a novel written by American author Thomas Pynchon and published in 1966. The shortest of Pynchon's novels, the plot follows Oedipa Maas, a young Californian woman, who begins to embrace a conspiracy theory as she possibly unearths a centuries-old conflict between two mail distribution companies; one of these companies, Thurn and Taxis, actually existed (1806–1867) and was the first private firm to distribute postal mail. Like most of Pynchon's output, Lot 49 is often described as postmodernist literature. Time included the novel in its \"TIME 100 Best English-Language Novels from 1923 to 2005\".",
      itemPrice: 949,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/51wPIcH+uTL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Time Traveler's Wife by Audrey Niffennegger",
      itemDescription:
        "The Time Traveler's Wife is the debut novel by the American author Audrey Niffenegger, published in 2003.",
      itemPrice: 1379,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/817iFfLhJ+L.jpg",
    }),
    InventoryItem.create({
      itemName: "The Horse Whisperer by Nicholas Evans",
      itemDescription:
        "The Horse Whisperer is a 1995 novel by English author Nicholas Evans. The book was his debut novel, and gained significant success, becoming the 10th best selling novel in the United States in 1995, selling over 15 million copies. This also makes it one of the best-selling books of all time.",
      itemPrice: 999,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91u7OTaWzEL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Charterhouse of Parma by Stendhal",
      itemDescription:
        "The Charterhouse of Parma is a novel by Stendhal published in 1839. Telling the story of an Italian nobleman in the Napoleonic era and later, it was admired by Balzac, Tolstoy, André Gide, di Lampedusa and Henry James. It was inspired by an inauthentic Italian account of the dissolute youth of Alessandro Farnese.",
      itemPrice: 1295,
      itemImageUrl:
        "https://m.media-amazon.com/images/I/513+vYfLpPL.jpg",
    }),
    InventoryItem.create({
      itemName: "A Christmas Carol by Charles Dickens",
      itemDescription:
        "A Christmas Carol. In Prose. Being a Ghost Story of Christmas, commonly known as A Christmas Carol, is a novella by Charles Dickens, first published in London by Chapman & Hall in 1843 and illustrated by John Leech.",
      itemPrice: 1869,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91r7kYxAAyL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Tale of Genji by Murasaki Shikibu",
      itemDescription:
        "The Tale of Genji is a classic work of Japanese literature written in the early 11th century by the noblewoman and lady-in-waiting Murasaki Shikibu. The original manuscript, created around the peak of the Heian period, no longer exists.",
      itemPrice: 779,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91UP1AIBO8L.jpg",
    }),
    InventoryItem.create({
      itemName: "Appointment in Samarra by John O'Hara",
      itemDescription:
        "Appointment in Samarra, published in 1934, is the first novel by American writer John O'Hara. It concerns the self-destruction of the fictional character Julian English, a wealthy car dealer who was once a member of the social elite of Gibbsville.",
      itemPrice: 1459,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91e3kmvKptL.jpg",
    }),
    InventoryItem.create({
      itemName: "Infinite Jest by David Foster Wallace",
      itemDescription:
        "Infinite Jest is a novel by American writer David Foster Wallace. The novel has an unconventional narrative structure and includes hundreds of extensive endnotes, some with footnotes of their own.",
      itemPrice: 1759,
      itemImageUrl:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1446876799l/6759.jpg",
    }),
    InventoryItem.create({
      itemName: "Deliverance by James Dickey",
      itemDescription:
        "Deliverance is the debut novel of American writer James Dickey, who had previously published poetry. It was adapted as a 1972 film of the same name directed by John Boorman. In 1998, the editors of the Modern Library selected Deliverance as #42 on their list of the 100 best 20th-Century novels.",
      itemPrice: 1269,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/91Vh2ThmMfL.jpg",
    }),
    InventoryItem.create({
      itemName: "Hamlet by William Shakespeare",
      itemDescription:
        "The Tragedy of Hamlet, Prince of Denmark, often shortened to Hamlet, is a tragedy written by William Shakespeare sometime between 1599 and 1601. It is Shakespeare's longest play, with 29,551 words.",
      itemPrice: 795,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81pl6ZLEFtL.jpg",
    }),
    InventoryItem.create({
      itemName: "Dead Souls by Nikolai Gogol",
      itemDescription:
        "Dead Souls is a novel by Nikolai Gogol, first published in 1842, and widely regarded as an exemplar of 19th-century Russian literature. The novel chronicles the travels and adventures of Pavel Ivanovich Chichikov and the people whom he encounters. These people typify the Russian middle-class of the time.",
      itemPrice: 599,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71mjbyBGQ0L.jpg",
    }),
    InventoryItem.create({
      itemName: "The Diary of a Young Girl by Anne Frank",
      itemDescription:
        "The Diary of a Young Girl, also known as The Diary of Anne Frank, is a book of the writings from the Dutch-language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands.",
      itemPrice: 2767,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81xPFVVGesL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Thorn Birds by Colleen McCullough",
      itemDescription:
        "The Thorn Birds is a 1977 best-selling novel by Australian author Colleen McCullough. Set primarily on Drogheda – a fictional sheep station in the Australian Outback named after Drogheda, Ireland – the story focuses on the Cleary family and spans the years 1915 to 1969.",
      itemPrice: 799,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71hXjahqldL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Odyssey by Homer",
      itemDescription:
        "The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is one of the oldest extant works of literature still widely read by modern audiences. As with the Iliad, the poem is divided into 24 books. It follows the Greek hero Odysseus, king of Ithaca, and his journey home after the Trojan War.",
      itemPrice: 1099,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81QAAnCNM7L.jpg",
    }),
    InventoryItem.create({
      itemName: "Journey to the End of the Night by Louis-Ferdinand Céline",
      itemDescription:
        "Journey to the End of the Night is the first novel by Louis-Ferdinand Céline. This semi-autobiographical work follows the adventures of Ferdinand Bardamu in the First World War, colonial Africa, the United States and the poor suburbs of Paris where he works as a doctor.",
      itemPrice: 1360,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61Ldtf4aUWL.jpg",
    }),
    InventoryItem.create({
      itemName: "A Confederacy of Dunces by John Kennedy Toole",
      itemDescription:
        "A Confederacy of Dunces is a picaresque novel by American novelist John Kennedy Toole which reached publication in 1980, eleven years after Toole's death.",
      itemPrice: 1045,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71e62bAUrKL.jpg",
    }),
    InventoryItem.create({
      itemName: "Song of Solomon by Toni Morrison",
      itemDescription:
        "Song of Solomon is a 1977 novel by American author Toni Morrison, her third to be published. It follows the life of Macon \"Milkman\" Dead III, an African-American man living in Michigan, from birth to adulthood.",
      itemPrice: 1338,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61EKxawb6xL.jpg",
    }),
    InventoryItem.create({
      itemName: "Life of Pi by Yann Martel",
      itemDescription:
        "Life of Pi is a Canadian philosophical novel by Yann Martel published in 2001. The protagonist is Piscine Molitor \"Pi\" Patel, an Indian Tamil boy from Pondicherry who explores issues of spirituality and metaphysics from an early age.",
      itemPrice: 899,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81E9oNSK3bL.jpg",
    }),
    InventoryItem.create({
      itemName: "Middlemarch by George Eliot",
      itemDescription:
        "Middlemarch, A Study of Provincial Life is a novel by the English author Mary Anne Evans, who wrote as George Eliot. It first appeared in eight instalments in 1871 and 1872. Set in Middlemarch, a fictional English Midland town, in 1829 to 1832, it follows distinct, intersecting stories with many characters.",
      itemPrice: 1459,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81VoZi3VcEL.jpg",
    }),
    InventoryItem.create({
      itemName: "The Trial by Franz Kafka",
      itemDescription:
        "The Trial is a novel written by Franz Kafka in 1914 and '15 and published posthumously on 26 April 1925. One of his best known works, it tells the story of Josef K., a man arrested and prosecuted by a remote, inaccessible authority, with the nature of his crime revealed neither to him nor to the reader.",
      itemPrice: 1199,
      itemImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51wQmxud3NL.jpg",
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
  console.log(`seeded ${inventoryItems.length} inventory items`);  console.log(`seeded successfully`);
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
