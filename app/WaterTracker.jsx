import { StyleSheet, Text, View, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

let selectedIndex = 0;

export default function WaterTracker() {

  let val = 0

  const [value, setValue] = useState(0)
  const [graph, setGraph] = useState([false, false, false, false, false, false, false, false])


  function updateGraph () {
    selectedIndex = selectedIndex + 1;
    let tempGraph = [false, false, false, false, false, false, false, false]

    let x = 0;
    
    for (let i = graph.length - 1; x < selectedIndex; i--) {
      tempGraph[i] = true;
      x = x + 1
    }

    setGraph(tempGraph);
  }

  function setTicks() {

    if (val === 0) {
      val = val + 1;
    }
    else if (val === 1) {
      val = val - 1;
    }

    return val;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <FontAwesomeIcon size={20} icon={faDroplet} style={{color: '#4f99fe'}} />    
            <Text style={styles.waterIconText}>Water</Text>   
          </View>
          <Text style={styles.waterValue}>{value} ml</Text>
          <Text style={{color: '#7e8189', fontSize: 20, fontWeight: '500',}}>Today</Text>
          <Pressable onPress={() => {
            value < 10000 && setValue(value + 250);
            updateGraph();
          }} style={styles.button}>
            <Text style={styles.buttonText}>+ 250 ml</Text>
          </Pressable>
        </View>
        <View style={styles.graphContainer}>
          {graph.map((item, index) => {
            return (
              <View key={index + 1} style={item === true ? styles.active : styles.inactive}>
                <View style={setTicks() === 1 ? styles.fullTick : styles.halfTick}></View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  mainContainer: {
    width: 300,
    height: 300,
    borderRadius: 40,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoContainer: {
    backgroundColor: '#1c1e2a',
    paddingVertical: 30,
    flex: 4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  graphContainer: {
    backgroundColor: '#252b3b',
    flex: 1,
    height: '100%',
  },

  waterIconText: {
    color: '#c5c9cc', 
    fontSize: 25, 
    fontWeight: '500', 
    marginLeft: 5
  },

  waterValue: {
    color: 'white', 
    fontSize: 50, 
    fontWeight: '700',
    marginTop: 40,
  },

  button: {
    backgroundColor: '#5099ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 100,
    marginTop: 40,
  },

  buttonText: {
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
  },

  active: {
    flex: 1,
    backgroundColor: '#5099ff',
    alignItems: 'flex-end',
  },

  inactive: {
    flex: 1,
    alignItems: 'flex-end',
  },

  fullTick: {
    width: '50%',
    height: '100%',
    borderTopColor: '#323847',
    borderTopWidth: 1,
  },

  halfTick: {
    borderTopColor: '#323847',
    width: '20%',
    height: '100%',
    borderTopWidth: 1,
  }
});
