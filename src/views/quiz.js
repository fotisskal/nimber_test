import React from 'react';

import {Spacer} from '../components/';
import {Html5Entities} from 'html-entities';
import {Manager} from '../app/manager';
let sw = Manager.scaleW;
let sh = Manager.scaleH;
let sf = Manager.scaleF;

import {Text, View, StyleSheet} from 'react-native';

import {colors} from '../app/style';
import ButtonsTile from '../components/buttonsTile';

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
  tile: {
    flexDirection: 'column',
  },
  tile_question: {
    backgroundColor: '#ffd700',
    color: '#000080',
    borderRadius: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: 'blue',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
    margin: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: sf(5),
    height: sh(30),
    width: sw(70),
  },
  styleTrue: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    width: sw(21),
  },
  styleFalse: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    width: sw(21),
  },
});

class QuizTile extends React.Component {
  render() {
    return (
      <View style={styles.tile}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text textBreakStrategy={'simple'} style={styles.tile_question}>
            {this.props.quiz_question}
          </Text>
        </View>
        <Spacer height={sh(0.3)} />
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: sf(5.5),
            color: '#000080',
          }}>
          {this.props.quiz_index + ' of ' + this.props.quiz_size}
        </Text>
      </View>
    );
  }
}

class Quiz extends React.Component {
  state = {
    questions: null,
    question_index: 0,
    score: 0,
    questions_loaded: false,
  };

  constructor() {
    super();
    this.handleAnswer = this.handleAnswer.bind(this);
    this.unescapeText = this.unescapeText.bind(this);
  }

  async componentDidMount() {
    try {
      let result = await Manager.getQuizData('10', 'hard', 'boolean');
      if (result && (result.error || result.response_code !== 0)) {
        console.log('Error');
        Manager.showError({
          message: result.error_description,
          modal: true,
        });
        return;
      }
      if (result && result.results) {
        this.setState({questions: result.results, questions_loaded: true});
      }
    } catch (e) {
      console.log('E');
      console.log(e.message);
    }
  }

  unescapeText(str) {
    const entities = new Html5Entities();
    return entities.decode(str);
  }

  async handleAnswer(value) {
    let questions = [...this.state.questions];
    let question = questions[this.state.question_index];
    if (value === question.correct_answer) {
      await this.setState({
        score: this.state.score + 1,
      });
      question.status = true;
    } else {
      question.status = false;
    }
    questions[this.state.question_index] = question;
    if (this.state.question_index === this.state.questions.length - 1) {
      await this.setState({questions});
      Manager.navigateTo('results', {
        quiz_results: this.state.questions,
        quiz_score: this.state.score,
      });
    } else {
      this.setState({questions, question_index: this.state.question_index + 1});
    }
  }

  render() {
    return (
      <View style={styles.background}>
        {this.state.questions_loaded ? (
          <View style={styles.content}>
            <Spacer height={sh(1)} />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: sw(80),
                height: sh(10),
              }}>
              <Text
                style={{
                  textAlignVertical: 'center',
                  fontSize: sf(6.3),
                  textAlign: 'center',
                  color: '#004988',
                  fontWeight: 'bold',
                }}>
                {this.state.questions[this.state.question_index].category}
              </Text>
            </View>
            <Spacer height={sh(2)} />
            <QuizTile
              quiz_question={this.unescapeText(
                this.state.questions[this.state.question_index].question,
              )}
              quiz_index={this.state.question_index + 1}
              quiz_size={this.state.questions.length}
            />
            <Spacer height={sh(1)} />
            <ButtonsTile
              styleTrue={styles.styleTrue}
              styleFalse={styles.styleFalse}
              valueA={'True'}
              valueB={'False'}
              onPress={this.handleAnswer}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default Quiz;
