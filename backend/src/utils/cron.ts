import cron from 'node-cron'
import { TaskRepository } from '../infrastructure/database/repository/taskRepository'

const taskRepository = new TaskRepository()

cron.schedule('0 0 * * *', async() => {
    try{
        await taskRepository.checkDueTasks();
    }catch(error) {
        console.error('Error cron job')
    }
})


console.log('Cron job to update overdue tasks is running...');

export {cron} 