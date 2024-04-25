## 나만의 아이템
> React로 제작한 나만의 여러 실험물 및 아이템

### Installation
```bash
npm i @byoungyoon/by-asset
```

### Basic Usage

#### Tree
> target의 layout을 지정하고 원하는 color를 option으로 추가하고 Tree 컴포넌트를 사용하면 됩니다.

```node
<div id="tree" style={{ width: '100%', height: '100dvh' }}>
    <Tree target="tree" color="#ffc5d0" />
</div>
```

| option | default | explanation                        |
|--------|---------|------------------------------------|
| target | -       | 레이아웃의 기준이 되는 id를 연결해야 합니다.         |
| color  | -       | Tree의 베이스 컬러를 선택해야 합니다.            |
| reset   | 0       | reset의 숫자를 키우면 Tree가 초기화가 됩니다.     |
| isResize   | false   | canvas의 resize시의 액션을 선택할 수 있습니다.   |
| defaultDepth   | 11      | Tree의 branch 깊이를 선택할 수 있습니다.       |
| defaultCount   | 3       | 로드시 생성할 Tree 숫자를 선택할 수 있습니다.       |
| level   | 3       | Tree 나무 굵기나 길이를 level로 조절할 수 있습니다. |

#### Sakura
> 상위의 layout을 지정하고 Sakura 컴포넌트를 사용하면 됩니다.

```node
<div style={{ width: '100%', height: '100dvh' }}>
    <Sakura />
</div>
```

| option | default | explanation                           |
|--------|---------|---------------------------------------|
| children | -       | 하위 태그들을 추가할 수 있습니다.                   |
| total  | 200     | 보이는 벚꽃 수를 조절할 수 있습니다.                 |
| fallSpeed   | 1       | 벚꽃이 떨어지는 속도를 조절할 수 있습니다. (낮을수록 빨라집니다) |

#### Alert
> ref로 AnimateAlert로 연결한 후 사용하시면 됩니다.

```node
const TestAnimate = () => {
    const ref = useRef<null | AddAlert>(null);

    const onClick = () => {
        const random = Number((Math.random() * 3).toFixed());
        let type: string = "";
        switch (random) {
            case 0:
                type = "success";
                break;
            case 1:
                type = "info";
                break;
            case 2:
                type = "warning";
                break;
            case 3:
                type = "error";
                break;
            default:
                break;
        }

        ref.current?.(type, loremIpsum());
    };

    return (
        <>
            <button id="button-alert" type="button" onClick={onClick}>
                open alert
            </button>
            <AnimateAlert
                children={(add: AddAlert) => {
                    ref.current = add;
                }}
            />
        </>
    );
};
```

| option  | default | explanation                                |
|---------|---------|--------------------------------------------|
| type    | -       | success, info, warning, error에서 선택 가능 합니다. |
| message | -       | Alert에 보이는 텍스트를 지정 가능합니다.                  |
| timeout | -       | Alert이 사라지는 속도를 조절할 수 있습니다.                |


### Live Demo

> https://65b10084d2f5459f2a48261e-isxbzbxhwr.chromatic.com/