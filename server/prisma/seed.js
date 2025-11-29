const prisma = require('./client');

async function run() {
    await prisma.user.createMany({
        data: [
            { name: 'Alice', email: 'alice@example.com', role:'MANAGER', },
            { name: 'Bob', email: 'bob@example.com', role: 'MEMBER', },
            {name: 'Charlie', email: 'charlie@example.com', role: 'MEMBER'}
        ]
     });
     console.log('Seeding complete');
}

run().then(() => process.exit(0)).catch(err=> {
    console.error(err);
    process.exit(1);                                    
})
