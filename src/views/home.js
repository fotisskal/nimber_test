import React from 'react';

import {Spacer} from '../components/';

import {Manager} from '../app/manager';
let sw = Manager.scaleW;
let sh = Manager.scaleH;
let sf = Manager.scaleF;

import {Text, View, StyleSheet} from 'react-native';

import {colors} from '../app/style';
import {Separator} from '../components';

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background_blue,
    flexDirection: 'column',
    flex: 1,
    height: sh(100),
    flexGrow: 1,
    marginHorizontal: 'auto',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

class Home extends React.Component {
  constructor() {
    super();
    this.begin = this.begin.bind(this);
  }

  begin() {
    Manager.navigateTo('quiz');
  }

  render() {
    return (
      <View style={styles.background}>
        <Spacer height={sh(1)} />
        <View
          style={{flexDirection: 'row', alignSelf: 'center', width: sw(60)}}>
          <Text
            style={{
              textAlignVertical: 'center',
              fontSize: sf(7),
              textAlign: 'center',
              color: '#004988',
              fontWeight: 'bold',
            }}>
            {'Welcome to the Trivia Challenge!'}
          </Text>
        </View>
        <Spacer height={sh(2)} />
        <Separator
          size={sh(30)}
          horizontal
          color={'#008080'}
          style={{
            marginHorizontal: 20,
            marginVertical: 8,
            alignSelf: 'center',
          }}
          weight={0.3}
        />
        <Spacer height={sh(0.5)} />
        <View style={styles.content}>
          <View
            style={{flexDirection: 'row', alignSelf: 'center', width: sw(60)}}>
            <Text
              style={{
                textAlignVertical: 'center',
                fontSize: sf(5),
                textAlign: 'center',
                letterSpacing: 2,
                color: '#4b0082',
              }}>
              {'You will be presented with 10 True or False questions.'}
            </Text>
          </View>
          <Spacer height={sh(1)} />
          <Separator
            size={sh(30)}
            horizontal
            color={'#008080'}
            style={{
              marginHorizontal: 20,
              marginVertical: 8,
              alignSelf: 'center',
            }}
            weight={0.3}
          />
          <Spacer height={sh(1)} />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: sw(70),
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                fontSize: sf(4.5),
                textAlign: 'center',
                letterSpacing: 2,
                color: '#004988',
              }}>
              {'Can you score 100%?'}
            </Text>
          </View>
          <Spacer height={sh(2)} />
          <View style={{flexDirection: 'row', borderRadius: 5, width: sw(70)}}>
            <Text
              onPress={() => this.begin()}
              style={{
                fontSize: sf(4),
                padding: sw(2.6),
                textAlign: 'center',
                letterSpacing: 2,
                flex: 1,
                borderRadius: 6,
                backgroundColor: '#014e8c',
                color: 'white',
              }}>
              {'BEGIN'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
