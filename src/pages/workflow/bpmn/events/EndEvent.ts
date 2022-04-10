import { CircleNode, CircleNodeModel, h } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';

class EndEventModel extends CircleNodeModel {
  static extendKey = 'EndEventModel';

  constructor(data, graphModel) {
    if (!data.id) {
      data.id = `EndEvent_${getBpmnId()}`;
    }
    if (!data.text) {
      data.text = '';
    }
    if (data.text && typeof data.text === 'string') {
      data.text = {
        // value: data.text,
        x: data.x,
        y: data.y + 40,
      };
    }
    super(data, graphModel);
  }

  setAttributes(): void {
    this.r = 18;
  }

  getNodeStyle() {
    let style = super.getNodeStyle();
    style.stroke = '#FF0040';
    return { ...style };
  }

  getConnectedSourceRules() {
    const rules = super.getConnectedSourceRules();
    const notAsSource = {
      message: '结束节点不能作为边的起点',
      validate: () => false,
    };
    rules.push(notAsSource);
    return rules;
  }
}

class EndEventView extends CircleNode {
  static extendKey = 'EndEventView';

  getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      'svg',
      {
        stroke: '#FF0040',
        x: x - width / 2 + 10,
        y: y - height / 2 + 8,
        width: 20,
        height: 20,
        viewBox: '0 0 1274 1024',
      },
      h('path', {
        fill: '#d81e06',
        d:
          'M1024 127.937531v767.625183c0 70.665495-57.272035 127.937531-127.937531 127.93753h-767.625183c-70.665495 0-127.937531-57.272035-127.93753-127.93753v-767.625183c0-70.665495 57.272035-127.937531 127.93753-127.937531h767.625183c70.665495 0 127.937531 57.272035 127.937531 127.937531z',
      }),
    );
  }

  getShape() {
    const { model } = this.props;
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    // todo: 将basic-shape对外暴露，在这里可以直接用。现在纯手写有点麻烦。
    return h('g', {}, [
      super.getShape(),
      this.getLabelShape(),
    ]);
  }
}

const EndEvent = {
  type: 'bpmn:endEvent',
  view: EndEventView,
  model: EndEventModel,
};

export { EndEventView, EndEventModel };
export default EndEvent;
