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
