type OnlineStatusProps = {
  isOnline: boolean;
}

const OnlineStatus:React.FC<OnlineStatusProps> = ({ isOnline }) => {
  return (
    <div className={isOnline ? 'online' : 'offline'}></div>
  );
}

export default OnlineStatus;