---
title: 图形学基础：坐标、向量与矩阵变换
date: 2026-08-22 00:00:00
categories:
  - 图形学
tags:
  - Unity
  - 数学
  - 线性代数
mathjax: true
---

本文整理图形学与 Unity 中最常用的线性代数概念：坐标系、点与向量、矩阵，以及齐次坐标下的仿射变换。文中约定向量为列向量。

## 坐标系

三维笛卡尔坐标系由一个原点和三条坐标轴构成。若三条基向量两两垂直，且长度均为 1，则称它们为**标准正交基**（orthonormal basis）。

- **正交**：两个向量垂直。
- **单位长度**：向量的模为 1。
- 坐标系按轴的朝向可分为左手系和右手系。

Unity 的模型空间与世界空间通常按左手系理解；观察空间中，相机前方对应视图空间的负 $z$ 轴。实际编写 Shader 时，应以所使用的矩阵和 API 约定为准。

## 点与向量

点表示位置，向量表示方向与位移。向量可与标量进行乘除，也可以进行加减；向量相加可理解为首尾相接的位移叠加。

### 模与单位向量

向量 $\mathbf{v}=(v\_x,v\_y,v\_z)$ 的模为：

$$
\lVert\mathbf{v}\rVert = \sqrt{v\_x^2+v\_y^2+v\_z^2}
$$

其单位向量为：

$$
\hat{\mathbf{v}}=\frac{\mathbf{v}}{\lVert\mathbf{v}\rVert}
$$

### 点积

点积（dot product / inner product）有两种常用写法：

$$
\mathbf{a}\cdot\mathbf{b}
=a\_xb\_x+a\_yb\_y+a\_zb\_z
=\lVert\mathbf{a}\rVert\lVert\mathbf{b}\rVert\cos\theta
$$

它可用于计算投影、判断夹角与检测朝向。当 $\mathbf{a}$、$\mathbf{b}$ 均为单位向量时：

$$
\theta=\arccos(\mathbf{a}\cdot\mathbf{b})
$$

常用性质如下：

$$
(k\mathbf{a})\cdot\mathbf{b}=\mathbf{a}\cdot(k\mathbf{b})=k(\mathbf{a}\cdot\mathbf{b})
$$

$$
\mathbf{a}\cdot(\mathbf{b}+\mathbf{c})
=\mathbf{a}\cdot\mathbf{b}+\mathbf{a}\cdot\mathbf{c}
$$

$$
\mathbf{v}\cdot\mathbf{v}=\lVert\mathbf{v}\rVert^2
$$

### 叉积

叉积（cross product / outer product）产生一个同时垂直于两个输入向量的向量：

$$
\mathbf{a}\times\mathbf{b}
=\begin{pmatrix}
a\_yb\_z-a\_zb\_y\\
a\_zb\_x-a\_xb\_z\\
a\_xb\_y-a\_yb\_x
\end{pmatrix}
$$

其模为平行四边形面积：

$$
\lVert\mathbf{a}\times\mathbf{b}\rVert
=\lVert\mathbf{a}\rVert\lVert\mathbf{b}\rVert\sin\theta
$$

叉积满足反交换律 $\mathbf{a}\times\mathbf{b}=-\mathbf{b}\times\mathbf{a}$，但不满足结合律。它常用于计算平面或三角形的法线，以及判断三角面片的朝向。

## 矩阵

### 矩阵运算

矩阵可以与标量相乘，也可与其他矩阵相乘。矩阵乘法满足结合律，但通常**不满足交换律**：

$$
AB\ne BA
$$

### 特殊矩阵

1. **转置矩阵**：$(A^T)^T=A$，且 $(AB)^T=B^TA^T$。
2. **逆矩阵**：若 $A$ 可逆，则 $AA^{-1}=I$；并非每个矩阵都可逆。
3. **正交矩阵**：若 $Q^TQ=I$，则 $Q^{-1}=Q^T$。纯旋转矩阵是正交矩阵。

在 Unity 中，向量通常作为 $n\times1$ 的列矩阵，矩阵从左侧相乘：

$$
MVP\,\mathbf{v}
$$

因此变换的实际执行顺序应从右向左阅读。

## 矩阵变换

| 变换 | 线性变换 | 仿射变换 | 可逆 | 正交 |
| --- | :---: | :---: | :---: | :---: |
| 平移 | 否 | 是 | 是 | 否 |
| 绕坐标轴旋转 | 是 | 是 | 是 | 是 |
| 绕任意轴旋转 | 是 | 是 | 是 | 是 |
| 按坐标轴缩放 | 是 | 是 | 是* | 否 |
| 错切 | 是 | 是 | 是 | 否 |
| 镜像 | 是 | 是 | 是 | 是 |
| 正交投影 | 是 | 是 | 否 | 否 |
| 透视投影 | 否 | 否 | 否 | 否 |

\* 缩放系数不能为 0。

### 齐次坐标

在齐次坐标中，点写为 $(x,y,z,1)^T$，方向向量写为 $(x,y,z,0)^T$。这使同一个 $4\times4$ 矩阵既能表示旋转、缩放，也能表示平移：平移会作用于点，但不会影响方向向量。

一个通用仿射变换矩阵可分解为：

$$
M=
\begin{pmatrix}
\mathbf{M} & \mathbf{t}\\
\mathbf{0} & 1
\end{pmatrix}
$$

其中 $\mathbf{M}\in\mathbb{R}^{3\times3}$ 负责旋转、缩放或错切，$\mathbf{t}\in\mathbb{R}^{3\times1}$ 为平移向量。

### 平移

$$
\begin{pmatrix}
1&0&0&t\_x\\
0&1&0&t\_y\\
0&0&1&t\_z\\
0&0&0&1
\end{pmatrix}
\begin{pmatrix}x\\ y\\ z\\ 1\end{pmatrix}
=\begin{pmatrix}x+t\_x\\ y+t\_y\\ z+t\_z\\ 1\end{pmatrix}
$$

若输入是方向向量（最后一项为 0），平移项不会生效。

### 缩放

$$
\begin{pmatrix}
k\_x&0&0&0\\
0&k\_y&0&0\\
0&0&k\_z&0\\
0&0&0&1
\end{pmatrix}
\begin{pmatrix}x\\ y\\ z\\ 1\end{pmatrix}
=\begin{pmatrix}k\_xx\\ k\_yy\\ k\_zz\\ 1\end{pmatrix}
$$

缩放同时影响点和方向向量。

### 旋转

以下矩阵表示右手规则下、绕各坐标轴旋转 $\theta$ 的齐次变换矩阵：

$$
R\_x(\theta)=
\begin{pmatrix}
1&0&0&0\\
0&\cos\theta&-\sin\theta&0\\
0&\sin\theta&\cos\theta&0\\
0&0&0&1
\end{pmatrix}
\qquad
R\_y(\theta)=
\begin{pmatrix}
\cos\theta&0&\sin\theta&0\\
0&1&0&0\\
-\sin\theta&0&\cos\theta&0\\
0&0&0&1
\end{pmatrix}
$$

$$
R\_z(\theta)=
\begin{pmatrix}
\cos\theta&-\sin\theta&0&0\\
\sin\theta&\cos\theta&0&0\\
0&0&1&0\\
0&0&0&1
\end{pmatrix}
$$

不同引擎、坐标系和向量乘法约定会影响旋转矩阵中的符号与组合顺序；在 Unity 中请始终结合具体 API 验证。

### 复合变换

对于列向量，若先缩放、再旋转、最后平移，则：

$$
\mathbf{p}\_{new}=M\_{translation}M\_{rotation}M\_{scale}\,\mathbf{p}\_{old}
$$

最右侧的矩阵最先作用于向量。

## 坐标空间与渲染管线

顶点会依次在模型、世界、观察、裁剪、NDC 与屏幕空间之间转换。对于列向量，完整的变换链可概括为：

$$
\mathbf{p}\_{clip}
=M\_{projection}M\_{view}M\_{model}\,\mathbf{p}\_{model}
$$

每一阶段都有明确职责：模型矩阵将局部几何放入世界，观察矩阵将世界相对于相机重新表达，投影矩阵则将相机视锥压缩到便于裁剪的齐次空间。

### 坐标空间变换

设子空间 $C$ 的三个坐标轴在父空间 $P$ 中分别为 $\mathbf{x}\_C$、$\mathbf{y}\_C$、$\mathbf{z}\_C$，原点为 $\mathbf{O}\_C$。子空间中一点的坐标为 $\mathbf{a}\_C=(a,b,c)^T$，则它在父空间中的位置为：

$$
\mathbf{a}\_P
=\mathbf{O}\_C+a\mathbf{x}\_C+b\mathbf{y}\_C+c\mathbf{z}\_C
$$

写成齐次矩阵形式：

$$
\mathbf{a}\_P=M\_{C\to P}\,\mathbf{a}\_C
\qquad
M\_{C\to P}=
\begin{pmatrix}
\mathbf{x}\_C & \mathbf{y}\_C & \mathbf{z}\_C & \mathbf{O}\_C \\
\mathbf{0}^{T} & \mathbf{0}^{T} & \mathbf{0}^{T} & 1
\end{pmatrix}
$$

其中前三列描述子空间三个基向量在父空间的方向，最后一列为子空间原点。方向向量的齐次分量为 0，因此不受最后一列的平移影响；这也是变换法线和光照方向时可只取线性 $3\times3$ 部分的原因。

若 $M\_{C\to P}$ 的线性部分为正交矩阵，则其逆可由转置直接得到：

$$
M\_{P\to C}=M\_{C\to P}^{-1}=M\_{C\to P}^{T}
$$

> 上式的整体等号适用于不含平移的纯正交线性变换。含平移的齐次仿射矩阵应使用完整逆矩阵；其线性 $3\times3$ 部分仍可用转置求逆。

### 模型空间、世界空间与观察空间

**模型空间**（model / object / local space）是网格顶点随模型保存时所使用的局部坐标。Unity 的模型空间通常按左手系理解。

模型矩阵将顶点变换到**世界空间**：

$$
\mathbf{p}\_{world}=M\_{model}\,\mathbf{p}\_{model}
$$

世界空间是场景中所有对象共享的坐标参考。模型位置、旋转和缩放会体现在 $M\_{model}$ 中。

**观察空间**（view / camera space）以相机为参考系。在 Unity 的常见约定中，它与 OpenGL 风格的视图空间一致：相机前方沿负 $z$ 轴。观察变换为：

$$
\mathbf{p}\_{view}=M\_{view}\,\mathbf{p}\_{world}
$$

使用内置变换函数时通常无需手动处理左右手差异；但直接使用 Camera.cameraToWorldMatrix、Camera.worldToCameraMatrix 等接口时，应确认其矩阵约定。

### 裁剪空间与透视投影

裁剪空间（clip space，也称齐次裁剪空间）用于剔除完全位于视锥外的图元，并裁切与边界相交的图元。投影矩阵将观察空间中的顶点变换到这一空间。

令近、远裁剪面距离分别为 $N$、$F$，垂直视场角为 $\mathrm{FOV}$，屏幕纵横比为 $A$。近、远裁剪面的高度为：

$$
h\_N=2N\tan\left(\frac{\mathrm{FOV}}{2}\right)
\qquad
h\_F=2F\tan\left(\frac{\mathrm{FOV}}{2}\right)
$$

对应宽度满足：

$$
A=\frac{w\_N}{h\_N}=\frac{w\_F}{h\_F}
$$

在“观察空间前方为 $-z$、使用列向量、裁剪深度范围为 $[-w,w]$”的约定下，透视投影矩阵可写为：

$$
M\_{frustum}=
\begin{pmatrix}
\dfrac{\cot(\mathrm{FOV}/2)}{A}&0&0&0\\
0&\cot(\mathrm{FOV}/2)&0&0\\
0&0&-\dfrac{F+N}{F-N}&-\dfrac{2NF}{F-N}\\
0&0&-1&0
\end{pmatrix}
$$

因此：

$$
\mathbf{p}\_{clip}=M\_{frustum}
\begin{pmatrix}x\\ y\\ z\\ 1\end{pmatrix}
=
\begin{pmatrix}
\dfrac{x\cot(\mathrm{FOV}/2)}{A}\\
y\cot(\mathrm{FOV}/2)\\
-z\dfrac{F+N}{F-N}-\dfrac{2NF}{F-N}\\
-z
\end{pmatrix}
$$

该矩阵本质上对 $x$、$y$、$z$ 做不同缩放，并在 $z$ 上叠加平移；变换后的 $w=-z$。裁剪空间内的顶点必须满足：

$$
-w\le x\le w,\qquad -w\le y\le w,\qquad -w\le z\le w
$$

透视投影后，空间的深度方向会映射为“离相机越远，$z$ 越大”的形式。不同图形 API 的裁剪深度约定不同：OpenGL 风格通常为 $[-w,w]$，DirectX 风格通常为 $[0,w]$，因此投影矩阵不能不加区分地混用。

### NDC 与屏幕空间

图元裁剪后，通过齐次除法进入**标准化设备坐标**（NDC）：

$$
\mathbf{p}\_{ndc}
=\left(
\frac{x\_{clip}}{w\_{clip}},
\frac{y\_{clip}}{w\_{clip}},
\frac{z\_{clip}}{w\_{clip}}
\right)
$$

OpenGL 风格的 NDC 三个分量范围均为 $[-1,1]$；DirectX 风格的 $z$ 范围为 $[0,1]$。随后把 NDC 的 $x$、$y$ 映射到屏幕像素坐标。设屏幕宽高为 $W$、$H$：

$$
x\_{screen}=\frac{x\_{clip}W}{2w\_{clip}}+\frac{W}{2}
\qquad
y\_{screen}=\frac{y\_{clip}H}{2w\_{clip}}+\frac{H}{2}
$$

$z\_{clip}$ 通常会参与深度缓冲，$w\_{clip}$ 则可用于透视校正插值。Unity 会自动完成裁剪、齐次除法和屏幕映射；顶点着色器通常只需输出裁剪空间坐标。
