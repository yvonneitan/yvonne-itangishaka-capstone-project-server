app.post('/api/tasks', (req, res) => {
    const { list_type, task } = req.body;
    knex('tasks').insert({ list_type, task })
      .then(() => res.status(201).json({ message: 'Task added!' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
  app.get('/api/tasks', (req, res) => {
    knex('tasks').where('is_completed', false)
      .then(tasks => res.json(tasks))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
  app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task, is_completed } = req.body;
    knex('tasks').where({ id }).update({ task, is_completed })
      .then(() => res.json({ message: 'Task updated!' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
  app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    knex('tasks').where({ id }).del()
      .then(() => res.json({ message: 'Task deleted!' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  