import { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import TodoItem from './components/TodoItem';

export default function App() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([
        { isCompleted: false, text: "Go to the gym" },
        { isCompleted: false, text: "Make your bed" },
    ]);

    const textChangeHandler = (value) => {
        setText(value);
    };

    const createTodoHandler = () => {
        // TODO make better error handling
        if (!text) {
            return alert('Missing Todo Text!');
        };

        // TODO: Add ids
        const newTodo = {
            text,
            isCompleted: false,
        };

        setTodos(oldTodos => [...oldTodos, newTodo]);

        setText('');
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
                {todos.map(todo => <TodoItem key={todo.text} {...todo} />)}
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
