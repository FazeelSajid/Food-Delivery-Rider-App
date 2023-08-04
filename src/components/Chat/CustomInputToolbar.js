import {TouchableOpacity} from 'react-native';

const RenderSend = props => {
  console.log('RenderSend render');
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log('ref :: ', inputRef.current);
        onSend(inputRef.current);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
      }}>
      <View
        style={{
          justifyContent: 'center',
          padding: 20,
          paddingVertical: 15,
          borderRadius: 10,
          borderWidth: 0,
          backgroundColor: Colors.Orange,
        }}>
        <Icons.Send />
      </View>
    </TouchableOpacity>
  );
};

const CustomInputToolbar = props => {
  console.log('CustomInputToolbar render');
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        paddingVertical: 20,
        paddingTop: 8,
        borderTopWidth: 0,
        width: '90%',
        marginHorizontal: 20,
      }}
      // renderComposer={props => renderComposer(props)}
      renderComposer={props => {
        return <RenderComposer {...props} />;
      }}
      renderSend={props => {
        return <RenderSend {...props} />;
      }}
    />
  );
};

export default CustomInputToolbar;
