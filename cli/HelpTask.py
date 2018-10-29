from Task import Task

class HelpTask(Task):
  'Help task: show help for all available tasks'

  def __init__(self):
    super().__init__('help','help for all available tasks')
