---
title: 风格化自然场景练习
date: 2026-08-26 12:00:00
cover: /Images/NatureScene/NatureScenePratice_01.png
categories:
  - 场景练习
tags:
  - Unity
  - Shader
---

记录自然场景 Shader 的练习过程：从基础噪声扰动开始，逐步加入颜色变化、流光效果与 PBR 材质。

## 场景效果

![自然场景练习总览](/Images/NatureScene/NatureScenePratice_01.png)

## 草地 Shader 迭代

### 01. 噪声扰动：不使用 Y 轴

![草地噪声扰动：不使用 Y 轴](/Images/NatureScene/Grass_01_Noise_WithOutYAxis.png)

### 02. 噪声扰动：加入 Y 轴

![草地噪声扰动：加入 Y 轴](/Images/NatureScene/Grass_02_Noise_WithYAxis.png)

### 03. 基于噪声的颜色变化

![草地噪声基础颜色](/Images/NatureScene/Grass_03_NoiseBaseColor.png)

### 04. 流光效果

![草地流光效果](/Images/NatureScene/Grass_04_FlowLight.png)

### 05. 噪声与颜色组合

![草地噪声与颜色组合](/Images/NatureScene/Grass_05_NoiseCombineColor.png)

### 06. PBR 效果

![草地 PBR 效果](/Images/NatureScene/Grass_06_PBR.png)

## 如何做一棵树

### SpeedTree建模
建模部分参考教程：https://www.youtube.com/watch?v=PPbIkk1hO7s
建模部分没什么好说的，找参考然后无限调整，参数多试试就知道是什么意思了。

关于导出部分，SpeedTree导出面板上支持顶点色写入RGBA通道，但是实际测试过程中发现A通道写入数据在Unity中无法被正确解析，原因暂时未知，论坛有类似反馈，所以先只使用RGB通道。
SpeedTree支持编写导出脚本（lua）来自定义Pack顶点数据，后续可以试试。


![Speed Tree 导出顶点色设置](/Images/NatureScene/SpeedTreeExportColorData.png)

### 树木Shader

#### 01. 基本色
BaseMap * BaseColor, 使用AlphaClip裁切，添加viewDir判断垂直面并隐藏（消除插片感）

![基本色](/Images/NatureScene/Tree_01_Base.png)

#### 02. AO
使用导出到color.r通道的AO数据叠加secondColor, 增加树叶的体积感


<div class="image-comparison">
  <figure>
    <img src="/Images/NatureScene/Tree_01_Before_Second_Color.png" alt="SecondColor 前" />
    <figcaption>添加 SecondColor 前</figcaption>
  </figure>

  <figure>
    <img src="/Images/NatureScene/Tree_01_After_Second_Color.png" alt="SecondColor 后" />
    <figcaption>添加 SecondColor 后</figcaption>
  </figure>
</div>
