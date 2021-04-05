import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";

import StartScreen from './Screens/StartScreen';
import GameScreen from './Screens/GameScreen';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <StartScreen />
      </Route>
      <Route path="/game">
        <GameScreen />
      </Route>
     </Switch>
  );
}

export default App;
