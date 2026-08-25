---
title: Matrix
date: 2026-08-03 01:19:46
tags:
---

### 记录一些踩过的数学坑

Unity使用列主序（Column-major）
- 在内存上, Matrix4X4的16个float数据排列时，是一列一列存放的
- 在逻辑上，把向量看作列向量（4x1矩阵），在乘法中用矩阵左乘向量（M*V）
- Unity shader中的内置变换矩阵，如如 UNITY_MATRIX_VP 和 unity_ObjectToWorld，都是列主序的。所以 mul(UNITY_MATRIX_VP, mul(unity_ObjectToWorld, v.vertex)) 是标准写法
- 与UE的区别：
  - Unity视向量为列向量，矩阵左乘向量（M * V）；UE视向量为行向量，矩阵右乘向量（V * M）
  - 存储时，Unity使用列主序，UE在hlsl中是行主序