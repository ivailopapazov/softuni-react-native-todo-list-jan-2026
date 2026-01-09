import { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import TodoItem from './components/TodoItem';

export default function App() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([
        { id: 1, isCompleted: false, text: "Go to the gym" },
        { id: 2, isCompleted: false, text: "Make your bed" },
    ]);

    const textChangeHandler = (value) => {
        setText(value);
    };

    const createTodoHandler = () => {
        // TODO make better error handling
        if (!text) {
            return alert('Missing Todo Text!');
        };

        const lastTodoId = todos[todos.length - 1]?.id || 0;

        // TODO: Add ids
        const newTodo = {
            id: lastTodoId + 1,
            text,
            isCompleted: false,
        };

        setTodos(oldTodos => [...oldTodos, newTodo]);

        setText('');
    };

    const toggleTodoHandler = (todoId) => {
        setTodos(todos => todos.map(todo => todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    };

    const deleteTodoHandler = (todoId) => {
        setTodos(todos => todos.filter(todo => todo.id !== todoId));
    };

    return (
        <View style={styles.body}>
            <View>
                <Text style={styles.heading}>Todo List</Text>
            </View>

            <View style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'space-between', width: '100%', borderRadius: 5 }}>
                <TextInput
                    placeholder='Go to the gym!'
                    value={text}
                    onChangeText={textChangeHandler}
                    onSubmitEditing={createTodoHandler}
                />

                <Button title='Create' onPress={createTodoHandler} />
            </View>

            <View style={{ width: '100%' }}>
                {todos.map(todo => <TodoItem key={todo.id} {...todo} onDone={toggleTodoHandler} onDelete={deleteTodoHandler} />)}
            </View>
        </View>
    );
}

const styles = {
    body: {
        padding: 20,
        alignItems: 'center',
        gap: 30,
    },
    heading: {
        fontSize: 30,
        marginTop: 30,
        fontWeight: 'bold'
    },
    control: {
        flexDirection: 'row'
    }
}
