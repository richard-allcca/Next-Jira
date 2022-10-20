
// NOTE - Data inicial para db

interface SeedData {
   entries: SeedEntry[];
}

interface SeedEntry {
   description: string;
   status: string;
   createAt: number;
}

export const seedData: SeedData = {
   entries: [
      {
         description: 'Pending: Do culpa quis mollit adipisicing do commodo adipisicing nulla et sint incididunt reprehenderit consectetur.',
         status: 'pending',
         createAt: Date.now()
      },
      {
         description: 'Terminate: Consectetur excepteur eiusmod enim qui esse in incididunt exercitation velit esse velit.',
         status: 'in-progress',
         createAt: Date.now() - 100000
      },
      {
         description: 'Finished: Dolor pariatur incididunt nulla reprehenderit ex eu esse duis.',
         status: 'finished',
         createAt: Date.now() - 1000000
      },
   ]
}