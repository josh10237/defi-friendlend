# State: Redux

In this application, we are using redux to define state. If you haven't already, make sure to run `npm install redux react-redux @reduxjs/toolkit`.\

Redux uses actions, reducers, and dispatches to control state. Here are the instructions for use. 

### Reducers
The reducers take in the current state and an action. The action consists of a `type` and a `payload`. The `payload` will usually contain the new state that needs to be updated. Reducers will manipulate the payload if necessary and then return the new state. All reducers are in the reducers folder and are compiled in index.js. 

### Actions
The action folder has an index.js file. In this file, functions are defined. The functions will take in an argument (usually the payload) and return the "action" component of the reducer, which contains the `type` and the `payload`.

### Dispatch
Redux has a `useDispatch` hook that is used to create the dispatcher for any component, created with `const dispatch = useDispatch()`. This is where the functions created in the actions folder are called. Any time you want to update state, you call `dispatch(function(payload))`. This calls the action function, which then passes its action to the reducer, and the reducer updates the state of the entire app, accessible immediately to all components. 

### Accessing State
To access the state object in any component, Redux has a `useSelector` hook. For example, if I wanted the list of members, I would create a constant: `const members = useSelector((state) => state.member.members)`. The state object contains the entire state of the application, so `useSelector` helps to gather specific slices of the state that you need for a component. 

### Guidance for Usage
Anytime something is updated in the backend, it must also update the state in the frontend. These updates are done using the dispatch function to call actions. Instead of waiting for the backend to load and update everything, state is instantly updated and available to every component. 