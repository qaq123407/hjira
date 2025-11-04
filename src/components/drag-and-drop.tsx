import React, { ReactNode, RefObject } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          // 正确的方式是创建一个新元素并应用ref
          const Element = children.type;
          return (
            <Element
              {...children.props}
              {...provided.droppableProps}
              ref={provided.innerRef}
              provided={provided}
            >
              {children.props.children}
            </Element>
          );
        }
        return <div ref={provided.innerRef} {...provided.droppableProps} />;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          // 正确的方式是创建一个新元素并应用ref
          const Element = children.type;
          return (
            <Element
              {...children.props}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {children.props.children}
            </Element>
          );
        }
        return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} />;
      }}
    </Draggable>
  );
};