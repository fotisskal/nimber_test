import React from 'react';

import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

import {Manager} from '../app/manager';

let sh = Manager.scaleH;
let sw = Manager.scaleW;
let sf = Manager.scaleF;

const styles = StyleSheet.create({
  page_list: {
    backgroundColor: '#f0ffff',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: sw(70),
  },
  page_list_disabled: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    width: sw(70),
  },
  page_number: {
    textAlignVertical: 'center',
    fontSize: sf(5),
    color: '#375b8e',
    backgroundColor: '#f0ffff',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
  },
  page_number_disabled: {
    textAlignVertical: 'center',
    fontSize: sf(5),
    color: '#375b8e',
    backgroundColor: 'white',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
  },
  page_number_text: {
    fontSize: sf(5),
    color: '#375b8e',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  page_number_text_disabled: {
    fontSize: sf(5),
    color: '#78abcc',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  page_number_text_active: {
    fontSize: sf(5),
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  page_number_text_active_disabled: {
    fontSize: sf(5),
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  page_number_active: {
    textAlignVertical: 'center',
    fontSize: sf(5),
    color: 'white',
    backgroundColor: '#375b8e',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
  },
  page_number_active_disabled: {
    textAlignVertical: 'center',
    fontSize: sf(5),
    color: 'white',
    backgroundColor: '#78abcc',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
  },

  arrow: {
    color: '#375b8e',
  },

  arrow_disabled: {
    color: '#78abcc',
  },
  no_arrow: {
    color: 'white',
  },
});

class Paging extends React.Component {
  render() {
    let page_list = [];
    for (let i = 0; i < this.props.count; i++) {
      page_list.push(i);
    }
    let enabled = this.props.enabled;

    let active_style = this.props.enabled
      ? styles.page_number_active
      : styles.page_number_active_disabled;
    let inactive_style = this.props.enabled
      ? styles.page_number
      : styles.page_number_disabled;

    let active_text = this.props.enabled
      ? styles.page_number_text_active
      : styles.page_number_text_active_disabled;
    let inactive_text = this.props.enabled
      ? styles.page_number_text
      : styles.page_number_text_disabled;

    let can_go_next = this.props.current < this.props.count - 1;
    let can_go_prev = this.props.current > 0;

    return this.props.count > 1 ? (
      <View style={enabled ? styles.page_list : styles.page_list_disabled}>
        <TouchableWithoutFeedback
          style={styles.arrow}
          onPress={() =>
            can_go_prev ? this.props.onPageChange(this.props.current - 1) : null
          }>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={sh(3)}
            color={
              can_go_prev
                ? enabled
                  ? styles.arrow.color
                  : styles.arrow_disabled.color
                : styles.no_arrow.color
            }
          />
        </TouchableWithoutFeedback>

        {page_list.map((i) => {
          return (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => this.props.onPageChange(i)}>
              <View
                style={
                  i === this.props.current ? active_style : inactive_style
                }>
                <Text
                  style={
                    i === this.props.current ? active_text : inactive_text
                  }>
                  {i + 1}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
        <TouchableWithoutFeedback
          style={styles.arrow}
          onPress={() =>
            can_go_next ? this.props.onPageChange(this.props.current + 1) : null
          }>
          <FontAwesomeIcon
            icon={faChevronRight}
            size={sh(3)}
            color={
              can_go_next
                ? enabled
                  ? styles.arrow.color
                  : styles.arrow_disabled.color
                : styles.no_arrow.color
            }
          />
        </TouchableWithoutFeedback>
      </View>
    ) : null;
  }
}

export default Paging;
