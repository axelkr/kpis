class Task:
  'Common base class for all command line tasks'
  command = ''
  description = ''

  def __init__(self, commandName, description):
    self.command = commandName
    self.description = description
