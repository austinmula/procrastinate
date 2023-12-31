import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import testIDs from '../../utils/testIDs';
import variables from '../../utils/variables/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

interface State {
  items?: AgendaSchedule;
}

export default class CalendarScreen extends Component<State> {
  state: State = {
    items: undefined,
  };

  // reservationsKeyExtractor = (item, index) => {
  //   return `${item?.reservation?.day}${index}`;
  // };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar />
        <View style={styles.container}>
          <Agenda
            // calendarHeight={90}

            testID={testIDs.agenda.CONTAINER}
            items={this.state.items}
            loadItemsForMonth={this.loadItems}
            selected={'2023-11-16'}
            renderItem={this.renderItem}
            renderEmptyDate={this.renderEmptyDate}
            rowHasChanged={this.rowHasChanged}
            showClosingKnob={true}
            calendarStyle={{
              backgroundColor: variables.colors.lightBg,
            }}
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.header} // for horizontal only
            // disableWeekScroll
            //   theme={theme.current}
            // disableAllTouchEventsForDisabledDays
            // firstDay={1}
            //   markedDates={marked.current}
            // leftArrowImageSource={leftArrowIcon}
            // rightArrowImageSource={rightArrowIcon}
            // animateScroll
            // closeOnDayPress={false}

            style={{
              backgroundColor: variables.colors.lighterBg,
            }}
            theme={{
              selectedDayBackgroundColor: variables.colors.darkbg,
              selectedDotColor: variables.colors.tan,
              dotColor: variables.colors.darkbg,
              // textDayFontSize: 20,
              // backgroundColor: variables.colors.lighterBg,
              calendarBackground: variables.colors.lightBg,
              //   textDayHeaderFontSize: 20,
              // textMonthFontSize: 32,
              // arrowColor: 'orange',
              // textMonthFontWeight: '100',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              monthTextColor: variables.colors.darkbg,
              // indicatorColor: 'blue',
              //   backgroundColor: 'red',
              //   calendarBackground: '#f3f3f3',
              //   textDayFontWeight: '700',
              //   textSectionTitleColor: '#0D1B1E',
              //   selectedDayBackgroundColor: '#7798AB',
            }}
            // markingType={'period'}
            // markedDates={{
            //    '2017-05-08': {textColor: '#43515c'},
            //    '2017-05-09': {textColor: '#43515c'},
            //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
            //    '2017-05-21': {startingDay: true, color: 'blue'},
            //    '2017-05-22': {endingDay: true, color: 'gray'},
            //    '2017-05-24': {startingDay: true, color: 'gray'},
            //    '2017-05-25': {color: 'gray'},
            //    '2017-05-26': {endingDay: true, color: 'gray'}}}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            // renderDay={this.renderDay}
            // hideExtraDays={false}
            // showOnlySelectedDayItems
            // reservationsKeyExtractor={this.reservationsKeyExtractor}
          />
          {/* <Text style={{fontSize: 30, fontWeight: '700'}}>Calendar</Text> */}
        </View>
      </View>
    );
  }

  loadItems = (day: DateData) => {
    const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 1; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  };

  renderDay = (day: any) => {
    if (day) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 10,
            width: 10,
            backgroundColor: 'red',
          }}>
          <Text style={styles.customDay}>{day.getDay()}</Text>
        </View>
      );
    }
    return <View style={styles.dayItem} />;
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: variables.colors.lightBg,
    flex: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green',
  },
  dayItem: {
    marginLeft: 34,
  },
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: variables.colors.lighterBg,
  },
});

// import React, {useState} from 'react';
// import {Text, StyleSheet, StatusBar, View, Alert} from 'react-native';
// import {
//   Agenda,
//   DateData,
//   AgendaEntry,
//   AgendaSchedule,
// } from 'react-native-calendars';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import variables from '../../variables/colors';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import testIDs from '../../utils/testIDs';

// interface CalendarScreenProps {
//   navigation: any;
// }

// interface State {
//   items?: AgendaSchedule
// }

// const CalendarScreen: React.FC<State> = ({navigation}: CalendarScreenProps) => {
//   const [items, setItems] = useState<State>({})

//   const loadItems = (day: DateData) => {
//     const entries = items || {};

//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);

//         if (!entries[strTime]) {
//           entries[strTime] = [];

//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             entries[strTime].push({
//               name: 'Item for ' + strTime + ' #' + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//               day: strTime,
//             });
//           }
//         }
//       }

//       const newItems: AgendaSchedule = {};
//       Object.keys(entries).forEach(key => {
//         newItems[key] = entries[key];
//       });
//       setItems(newItems);
//     }, 1000);
//   };

//   const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
//     const fontSize = isFirst ? 16 : 14;
//     const color = isFirst ? 'black' : '#43515c';

//     return (
//       <TouchableOpacity
//         testID={testIDs.agenda.ITEM}
//         // style={[styles.item, {height: reservation.height}]}
//         onPress={() => Alert.alert(reservation.name)}>
//         <Text style={{fontSize, color}}>{reservation.name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderEmptyDate = () => {
//     return (
//       <View
//       // style={styles.emptyDate}
//       >
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   };

//   const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
//     return r1.name !== r2.name;
//   };

//   function timeToString(time: number) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }

//   return (
//     <View style={styles.mainContainer}>
//       <SafeAreaView style={styles.container}>
//         <Agenda
//           testID={testIDs.agenda.CONTAINER}
//           items={items}
//           loadItemsForMonth={loadItems}
//           selected={'2023-11-16'}
//           renderItem={renderItem}
//           renderEmptyDate={renderEmptyDate}
//           rowHasChanged={rowHasChanged}
//           showClosingKnob={true}
//           // markingType={'period'}
//           // markedDates={{
//           //    '2017-05-08': {textColor: '#43515c'},
//           //    '2017-05-09': {textColor: '#43515c'},
//           //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//           //    '2017-05-21': {startingDay: true, color: 'blue'},
//           //    '2017-05-22': {endingDay: true, color: 'gray'},
//           //    '2017-05-24': {startingDay: true, color: 'gray'},
//           //    '2017-05-25': {color: 'gray'},
//           //    '2017-05-26': {endingDay: true, color: 'gray'}}}
//           // monthFormat={'yyyy'}
//           // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//           // renderDay={this.renderDay}
//           // hideExtraDays={false}
//           // showOnlySelectedDayItems
//           // reservationsKeyExtractor={this.reservationsKeyExtractor}
//         />
//         <StatusBar />
//         {/* <Text style={{fontSize: 30, fontWeight: '700'}}>Calendar</Text> */}
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   mainContainer: {
//     flex: 1,
//     backgroundColor: variables.colors.lighterBg,
//   },
// });

// export default CalendarScreen;
