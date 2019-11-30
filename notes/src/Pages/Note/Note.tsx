import React from 'react';
import { RouteComponentProps } from '@reach/router';

interface RouteProps {
  noteId: number;
}

type OwnProps = RouteComponentProps<RouteProps>;

export const Note: React.FC<OwnProps> = props => {
  return <div>Edit note {props.noteId} </div>;
};
