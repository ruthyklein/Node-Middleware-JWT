
let tasks = [
  { id: 1, name: "לקפל כביסה", isComplete: true },
  { id: 2, name: "לשטוף כלים", isComplete: false }
]

const TasksController = {
  getList:  (req, res) => {
      console.log('getList userId', req.userId)
      const { name } = req.query
      const filtered = tasks.filter(t => !name || t.name.indexOf(name) == 0)
      res.send(filtered)
  },
  add:(req, res) => {
      const { name } = req.body
      const newTask = { id: 3, name }
      tasks.push(newTask)
      res.send(newTask)
  },
  update:(req, res) => {
      const { isComplete } = req.body
      const { id } = req.params
      const task = tasks.find(t => t.id == id)
      task.isComplete = isComplete
      res.send(task)
  },
  delete:(req, res) => {
      // const taskId = req.params.id
      const { id } = req.params
      tasks = tasks.filter(t => t.id != id)
      res.send(tasks)
  }
}

export default TasksController
