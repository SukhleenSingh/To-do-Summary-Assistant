import React, { useState } from 'react';

function TodoList({ todos, onDelete, onToggleComplete, onEdit }) {
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const handleEdit = (todo) => {
    setEditTodoId(todo.id);
    setEditedTitle(todo.title);
    setEditedContent(todo.content || '');
  };

  const handleEditSubmit = (todo) => {
    if (typeof onEdit === 'function') {
      onEdit(todo.id, editedTitle.trim(), editedContent.trim());
    }
    setEditTodoId(null);
    setEditedTitle('');
    setEditedContent('');
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditedTitle('');
    setEditedContent('');
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No todos yet! Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {todos.map(todo => (
            <tr
              key={todo.id}
              className={`hover:bg-gray-50 transition-colors duration-200 ${
                todo.completed ? 'bg-green-50' : ''
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleComplete(todo.id)}
                    className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                    aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  />
                </div>
              </td>

              <td className="px-6 py-4">
                {editTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={e => setEditedTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleEditSubmit(todo)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Edit title"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`text-sm font-medium ${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                {editTodoId === todo.id ? (
                  <textarea
                    value={editedContent}
                    onChange={e => setEditedContent(e.target.value)}
                    placeholder="Edit content"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={3}
                  />
                ) : (
                  <p
                    className={`text-sm text-gray-700 whitespace-pre-wrap ${
                      todo.completed ? 'line-through' : ''
                    }`}
                  >
                    {todo.content || <i className="text-gray-400">No details</i>}
                  </p>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(todo.createdAt).toLocaleString()}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                {editTodoId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleEditSubmit(todo)}
                      className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(todo)}
                      className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(todo.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
