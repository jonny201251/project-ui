import { CircleNode, CircleNodeModel, h } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';

class StartEventModel extends CircleNodeModel {
  static extendKey = 'StartEventModel';

  constructor(data, graphModel) {
    if (!data.id) {
      data.id = `StartEvent_${getBpmnId()}`;
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
    // fix: 不能直接全部加，会导致下载后再次上传，位置错误。
    // data.text.y += 40;
    super(data, graphModel);
  }

  setAttributes(): void {
    this.r = 18;
  }

  getNodeStyle() {
    let style = super.getNodeStyle();
    style.fill = '#1afa29';
    style.stroke = '#1afa29';
    return { ...style };
  }

  getConnectedTargetRules() {
    const rules = super.getConnectedTargetRules();
    const notAsTarget = {
      message: '起始节点不能作为边的终点',
      validate: () => false,
    };
    rules.push(notAsTarget);
    return rules;
  }
}

class StartEventView extends CircleNode {
  static extendKey = 'StartEventNode';

  getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      'svg',
      {
        stroke: '#1afa29',
        x: x - width / 2 + 7,
        y: y - height / 2 + 5,
        width: 26,
        height: 26,
        viewBox: '0 0 1024 1024',
      },
      h('path', {
        fill: '#FFFFFF',
        d:
          'M204.672 204.8l0.576-9.024a76.8 76.8 0 0 1 114.624-57.472l2.688 1.6 464.64 309.888a78.08 78.08 0 0 1-1.472 126.72l-462.08 306.816c-12.224 8.448-26.88 13.184-42.176 12.608-42.24-1.536-76.8-34.56-76.8-76.8V204.8z',
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

const StartEvent = {
  type: 'bpmn:startEvent',
  view: StartEventView,
  model: StartEventModel,
};

export { StartEventModel, StartEventView };
export default StartEvent;
