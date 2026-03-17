const cron = require('node-cron');
const Transaction = require('../models/Transaction');
const Member = require('../models/Member');

const calculateFines = async () => {
    try {
        console.log('Running fine calculation job...');
        const today = new Date();
        
        const overdueTransactions = await Transaction.find({
            status: 'issued',
            dueDate: { $lt: today }
        });

        for (const transaction of overdueTransactions) {
            const timeDiff = today.getTime() - transaction.dueDate.getTime();
            const daysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (daysLate > 0) {
                const fine = daysLate * 1; // 1 dollar per day
                
                if (transaction.fine !== fine) {
                    const diff = fine - transaction.fine;
                    transaction.fine = fine;
                    await transaction.save();

                    const member = await Member.findById(transaction.memberId);
                    if (member) {
                        member.fineBalance += diff;
                        await member.save();
                    }
                }
            }
        }
        console.log(`Processed ${overdueTransactions.length} overdue transactions.`);
    } catch (err) {
        console.error('Error in fine calculation job:', err);
    }
};

cron.schedule('0 0 * * *', calculateFines);

module.exports = calculateFines;
