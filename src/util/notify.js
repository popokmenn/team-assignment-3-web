export const _notify = (message, subject = '', type) => {
    var options = {};
    options = {
      place: 'tc',
    //   message: message,
      message: (
        <div>
          <div>
            {message} <b>{subject}</b>
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    return options
  };