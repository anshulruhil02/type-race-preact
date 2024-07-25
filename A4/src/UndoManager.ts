interface Action {
    undo: () => void;
    redo: () => void;
  }
  
  export class UndoManager {
    private undoStack: Action[] = [];
    private redoStack: Action[] = [];
  
    addAction(action: Action) {
      this.undoStack.push(action);
      this.redoStack = []; // Clear the redo stack whenever a new action is performed
    }
  
    undo() {
      const action = this.undoStack.pop();
      if (action) {
        action.undo();
        this.redoStack.push(action);
      }
    }
  
    redo() {
      const action = this.redoStack.pop();
      if (action) {
        action.redo();
        this.undoStack.push(action);
      }
    }
  
    canUndo() {
      return this.undoStack.length > 0;
    }
  
    canRedo() {
      return this.redoStack.length > 0;
    }
  }
  