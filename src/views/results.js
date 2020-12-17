import React, {Fragment} from 'react';

import {Spacer, Paging} from '../components';

import {Manager} from '../app/manager';

let sw = Manager.scaleW;
let sh = Manager.scaleH;
let sf = Manager.scaleF;

import {Text, View, StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {colors} from '../app/style';
import {Html5Entities} from 'html-entities';

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
    alignItems: 'center',
    width: sw(85),
  },
  question_result_tile: {
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: sf(5),
    width: sw(70),
  },
});

class QuestionResult extends React.Component {
  render() {
    return (
      <View style={styles.question_result_tile}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          {this.props.status ? (
            <Entypo
              name="plus"
              size={sh(7)}
              color={this.props.color ? this.props.color : '#20b2aa'}
            />
          ) : (
            <Entypo
              name="minus"
              size={sh(7)}
              color={this.props.color ? this.props.color : '#ff0000'}
            />
          )}
        </View>
        <View
          style={{
            borderRadius: 2,
            borderWidth: 2,
            borderColor: this.props.status ? '#20b2aa' : '#ff0000',
            justifyContent: 'center',
            width: sw(70),
          }}>
          <Text
            style={{
              textAlign: 'left',
              margin: 3,
              textAlignVertical: 'center',
              color: '#f5f5dc',
              fontWeight: 'bold',
              fontSize: sf(4),
            }}>
            {this.props.question}
          </Text>
        </View>
      </View>
    );
  }
}

class Results extends React.Component {
  state = {
    current_page: 0,
  };

  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.unescapeText = this.unescapeText.bind(this);
  }

  async componentDidMount() {}

  handlePageChange(page) {
    this.setState({current_page: page});
  }

  unescapeText(str) {
    const entities = new Html5Entities();
    return entities.decode(str);
  }

  render() {
    let pages = Math.ceil(this.props.quiz_results.length / 5);
    let current_page = this.state.current_page;

    return (
      <View style={styles.background}>
        <Spacer height={sh(1)} />
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            width: sw(80),
          }}>
          <Text
            style={{
              textAlignVertical: 'center',
              fontSize: sf(6.3),
              textAlign: 'center',
              color: '#004988',
              fontWeight: 'bold',
            }}>
            {'You scored '}
          </Text>
          <Text
            style={{
              textAlignVertical: 'center',
              fontSize: sf(6.3),
              textAlign: 'center',
              color: '#5f9ea0',
              fontWeight: 'bold',
            }}>
            {this.props.quiz_score + ' / ' + this.props.quiz_results.length}
          </Text>
        </View>
        <View style={styles.content}>
          <Spacer height={sh(0.7)} />
          {this.props.quiz_results.map((x, i) =>
            i >= current_page * 5 && i < current_page * 5 + 5 ? (
              <Fragment key={i}>
                <QuestionResult
                  question={this.unescapeText(x.question)}
                  status={x.status}
                />
                <Spacer height={0.6} />
              </Fragment>
            ) : null,
          )}
          <Spacer height={sh(0.5)} />
        </View>
        {pages > 1 ? (
          <Paging
            enabled={true}
            count={pages}
            current={current_page}
            onPageChange={this.handlePageChange}
          />
        ) : null}
        <Spacer height={sh(0.8)} />
        <View
          style={{flexDirection: 'row', width: sw(60), alignSelf: 'center'}}>
          <Text
            onPress={() => Manager.navigateTo('home', {}, true)}
            style={{
              fontSize: sf(4),
              padding: sw(2.6),
              textAlign: 'center',
              textAlignVertical: 'center',
              flex: 1,
              backgroundColor: '#014e8c',
              color: 'white',
            }}>
            {'PLAY AGAIN?'}
          </Text>
        </View>
      </View>
    );
  }
}

export default Results;
