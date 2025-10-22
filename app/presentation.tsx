"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    type: "title",
    title:
      "FINSENTLLM: MULTI-LLM AND STRUCTURED SEMANTIC SIGNALS FOR ENHANCED FINANCIAL SENTIMENT FORECASTING",
    subtitle: "Jenny Yu",
    content:
      "Training-free Integration Framework for Financial Sentiment Analysis",
    paperLink: "https://arxiv.org/abs/2509.12638",
  },
  {
    id: 2,
    type: "introduction",
    title: "Introduction",
    content: [
      "FINSENTLLM introduces a <strong>training-free integration framework</strong> for financial sentiment analysis",
      "The framework combines <strong>multiple LLM-based sentiment experts</strong> and <strong>structured semantic signals</strong> into a unified <strong>meta-classifier</strong> (XGBoost or Logistic Regression)",
      "Dataset: <strong>Financial PhraseBank</strong>—each sentence labeled as <strong>Positive</strong>, <strong>Neutral</strong>, or <strong>Negative</strong>",
      "Four agreement-based subsets are used: <strong>50%</strong>, <strong>66%</strong>, <strong>75%</strong>, and <strong>100%</strong> annotator agreement",
    ],
  },
  {
    id: 3,
    type: "process",
    title: "Process Overview",
    content: [
      "Step 1: <strong>Sentiment Extraction</strong> - Apply <strong>FinBERT</strong> and <strong>RoBERTa-Sentiment</strong> to obtain class probabilities (<strong>P_positive</strong>, <strong>P_neutral</strong>, <strong>P_negative</strong>)",
      "Step 2: <strong>Feature Expansion</strong> - Derive <strong>multi-LLM expert signals</strong> from prediction outputs",
      "Step 3: <strong>Structured Financial Semantics</strong> - Integrate features capturing <strong>uncertainty</strong>, <strong>divergence</strong>, and <strong>model agreement</strong>",
      "Step 4: <strong>Meta-Classifier Training</strong> - Use <strong>XGBoost</strong> or <strong>Logistic Regression</strong> to learn final sentiment decisions",
    ],
    image: "/flowchart.png",
  },
  {
    id: 4,
    type: "signals",
    title: "Interpretation of Semantic Signals",
    content: [
      "<strong>Logits</strong>: Transform probabilities into <strong>continuous, linearized values</strong>",
      "<strong>Max Prob</strong>: Highest probability—represents the model's <strong>strongest sentiment prediction</strong>",
      "<strong>Margin</strong>: Difference between <strong>top-two probabilities</strong>; <strong>small margin = ambiguous sentiment</strong>",
      "<strong>Entropy</strong>: Quantifies overall <strong>uncertainty</strong> across sentiment classes",
      "<strong>Expert Disagreement</strong>: Measures how different <strong>FinBERT</strong> and <strong>RoBERTa</strong> predictions are (<strong>1 = strong agreement</strong>, <strong>0.5 = partial disagreement</strong>, <strong>0 = opposite sentiments</strong>)",
      "<strong>Kullback–Leibler Divergence</strong>: Evaluates how much <strong>FinBERT's distribution</strong> diverges from <strong>RoBERTa's</strong>. <strong>Larger values = RoBERTa poorly captures FinBERT's sentiment perspective</strong>",
    ],
    image: "/table.png",
  },
  {
    id: 5,
    type: "comparison",
    title: "Evaluation and Comparison",
    content: [
      "<strong>Data Split</strong>: <strong>60% train</strong> / <strong>20% validation</strong> / <strong>20% test</strong>",
      "The <strong>60% train + 20% validation</strong> portions are combined for <strong>five-fold stratified cross-validation</strong> to ensure <strong>model robustness</strong>",
      "The final tuned model is evaluated on the <strong>held-out 20% test set</strong>",
      "For <strong>high-agreement subsets</strong> (<strong>75%</strong> and <strong>100%</strong>), where <strong>accuracy and F1 exceed 99%</strong>, <strong>early stopping</strong> is applied to avoid overfitting and stabilize performance",
    ],
    tableData: [
      {
        model: "OpenAI GPT-4o",
        acc50: "0.8330",
        f1_50: "0.8240",
        acc66: "0.8910",
        f1_66: "0.8837",
        acc75: "0.9190",
        f1_75: "0.9096",
        acc100: "0.9669",
        f1_100: "0.9635",
      },
      {
        model: "OpenAI GPT-4 mini",
        acc50: "0.8052",
        f1_50: "0.8103",
        acc66: "0.8673",
        f1_66: "0.8634",
        acc75: "0.9088",
        f1_75: "0.9054",
        acc100: "0.9514",
        f1_100: "0.9482",
      },
      {
        model: "Log Regression",
        acc50: "0.8990",
        f1_50: "0.8933",
        acc66: "0.9443",
        f1_66: "0.9380",
        acc75: "0.9667",
        f1_75: "0.9607",
        acc100: "0.9868",
        f1_100: "0.9801",
      },
      {
        model: "FINSENTLLM XGBoost",
        acc50: "<strong>0.9371</strong>",
        f1_50: "<strong>0.9346</strong>",
        acc66: "<strong>0.9751</strong>",
        f1_66: "<strong>0.9738</strong>",
        acc75: "<strong>0.9855</strong>",
        f1_75: "<strong>0.9824</strong>",
        acc100: "<strong>0.9934</strong>",
        f1_100: "<strong>0.9896</strong>",
      },
    ],
  },
  {
    id: 6,
    type: "analysis",
    title: "Auxiliary Market-Linkage Analysis (DCC-GARCH)",
    content: [
      "<strong>Datasets</strong>: <strong>FNSPID</strong> – financial news sentiment data (<strong>2018–2019</strong>) + <strong>Stock Market Indices</strong> – daily returns for six major stocks (<strong>2018–2019</strong>)",
      "<strong>Pre-Processing</strong>: Convert raw sentiment scores to <strong>standardized time series</strong>. Compute <strong>daily returns from log prices</strong>",
      "<strong>GARCH component</strong>: captures <strong>volatility clustering</strong>—<strong>large changes follow large changes</strong>",
      "<strong>DCC component</strong>: estimates <strong>time-varying correlations</strong> between standardized residuals; <strong>correlations evolve as sentiment and markets shift</strong>",
      "<strong>Alpha (α)</strong>: <strong>Shock Effect</strong>—limited short-run shcok effects. <strong>Lower α = stable sentiment-market correlation</strong>",
      "<strong>Beta (β)</strong>: <strong>Persistence Effect</strong>—how long correlations last. <strong>Higher β = slower decay</strong>",
      "<strong>Rho (ρ)</strong>: <strong>Mean Dynamic Correlation</strong>—average strength of <strong>co-movement between sentiment and returns</strong>",
    ],
    tableData: [
      {
        name: "VOO",
        description: "S&P 500 Index",
        alpha: "0.0215",
        beta: "0.9752",
        meanRho: "0.4853",
        correlation: "0.1872",
        pValue: "0.0000",
      },
      {
        name: "ACWI",
        description: "MSCI ACWI Global",
        alpha: "0.0301",
        beta: "0.9648",
        meanRho: "0.5000",
        correlation: "0.1788",
        pValue: "0.0001",
      },
      {
        name: "VTI",
        description: "Total US Market",
        alpha: "0.0257",
        beta: "0.9690",
        meanRho: "0.4937",
        correlation: "0.1984",
        pValue: "0.0000",
      },
      {
        name: "EFA",
        description: "MSCI EAFE Developed",
        alpha: "0.0278",
        beta: "0.9661",
        meanRho: "0.5000",
        correlation: "0.2246",
        pValue: "0.0000",
      },
      {
        name: "IWM",
        description: "Russell 2000 Small-Cap",
        alpha: "0.0637",
        beta: "0.9051",
        meanRho: "0.4429",
        correlation: "0.1528",
        pValue: "0.0006",
      },
      {
        name: "XLF",
        description: "Financial Sector ETF",
        alpha: "0.0275",
        beta: "0.9683",
        meanRho: "0.4171",
        correlation: "0.1378",
        pValue: "0.0020",
      },
    ],
  },
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key >= "1" && event.key <= "6") {
        setCurrentSlide(parseInt(event.key) - 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const renderSlide = (slide: (typeof slides)[0]) => {
    switch (slide.type) {
      case "title":
        return (
          <div className="slide relative overflow-hidden">
            {/* Enhanced background with gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-cyan-100/20 to-sky-200/40"></div>

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-cyan-300/30 rounded-full animate-bounce"
                style={{ animationDuration: "4s", animationDelay: "0s" }}
              ></div>
              <div
                className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-lg rotate-45 animate-pulse"
                style={{ animationDuration: "3s", animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-br from-cyan-200/40 to-sky-300/30 rounded-full animate-bounce"
                style={{ animationDuration: "5s", animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-32 right-32 w-20 h-20 bg-gradient-to-br from-blue-300/40 to-cyan-200/30 rounded-lg rotate-12 animate-pulse"
                style={{ animationDuration: "4s", animationDelay: "1.5s" }}
              ></div>
            </div>

            {/* Background financial elements with enhanced animations */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute top-20 left-20 text-6xl animate-bounce text-blue-600"
                style={{ animationDelay: "0s", animationDuration: "3s" }}
              >
                📈
              </div>
              <div
                className="absolute top-32 right-32 text-4xl animate-pulse text-green-600"
                style={{ animationDelay: "1s" }}
              >
                💹
              </div>
              <div
                className="absolute bottom-40 left-32 text-5xl animate-bounce text-blue-700"
                style={{ animationDelay: "2s", animationDuration: "4s" }}
              >
                📊
              </div>
              <div
                className="absolute bottom-20 right-20 text-3xl animate-pulse text-yellow-600"
                style={{ animationDelay: "0.5s" }}
              >
                💰
              </div>
              <div
                className="absolute top-1/2 left-10 text-4xl animate-bounce text-indigo-600"
                style={{ animationDelay: "1.5s", animationDuration: "3.5s" }}
              >
                🏦
              </div>
              <div
                className="absolute top-1/3 right-10 text-3xl animate-pulse text-purple-600"
                style={{ animationDelay: "2.5s" }}
              >
                💎
              </div>
              {/* Additional floating sparkles */}
              <div
                className="absolute top-10 left-1/2 text-2xl animate-ping"
                style={{ animationDelay: "3s", animationDuration: "4s" }}
              >
                ✨
              </div>
              <div
                className="absolute bottom-10 left-1/4 text-xl animate-spin"
                style={{ animationDelay: "1s", animationDuration: "8s" }}
              >
                ⭐
              </div>
              <div
                className="absolute top-1/4 left-3/4 text-2xl animate-bounce"
                style={{ animationDelay: "4s", animationDuration: "2.5s" }}
              >
                💫
              </div>
            </div>

            <div className="slide-content relative z-10">
              <div className="grid grid-cols-12 gap-8 h-full items-center">
                {/* Left side - Financial Icon */}
                <div className="col-span-3 flex justify-center">
                  <div className="relative">
                    {/* Main financial icon with rotating glow effect */}
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-accent to-sky-300 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                      <div
                        className="text-8xl animate-bounce"
                        style={{ animationDuration: "2s" }}
                      >
                        📊
                      </div>
                    </div>
                    {/* Floating animated elements around main icon */}
                    <div
                      className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-spin"
                      style={{ animationDuration: "4s" }}
                    >
                      <div className="text-2xl">💡</div>
                    </div>
                    <div
                      className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                      style={{ animationDelay: "1s" }}
                    >
                      <div className="text-2xl">🎯</div>
                    </div>
                    <div
                      className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-ping"
                      style={{ animationDuration: "3s" }}
                    >
                      <div className="text-lg">🚀</div>
                    </div>
                    {/* Additional orbiting icons */}
                    <div
                      className="absolute top-0 left-1/2 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                      style={{
                        animationDelay: "2s",
                        animationDuration: "2.5s",
                      }}
                    >
                      <div className="text-sm">🔥</div>
                    </div>
                    <div
                      className="absolute bottom-0 left-1/2 w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <div className="text-sm">⚡</div>
                    </div>
                  </div>
                </div>

                {/* Right side - Title and content */}
                <div className="col-span-9">
                  <div className="animate-fade-in text-left">
                    {/* University/Institution info */}
                    <div className="mb-6"></div>

                    {/* Main title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-blue-light to-sky-200 bg-clip-text text-transparent">
                      {slide.title}
                    </h1>

                    {/* Decorative line with animated icons */}
                    <div className="flex items-center mb-8">
                      <div
                        className="text-2xl mr-4 animate-bounce"
                        style={{
                          animationDelay: "1s",
                          animationDuration: "3s",
                        }}
                      >
                        💼
                      </div>
                      <div
                        className="flex-grow h-1 bg-gradient-to-r from-blue-accent via-sky-300 to-transparent rounded-full animate-pulse"
                        style={{ animationDuration: "3s" }}
                      ></div>
                      <div
                        className="text-2xl ml-4 animate-bounce"
                        style={{
                          animationDelay: "2s",
                          animationDuration: "3s",
                        }}
                      >
                        📈
                      </div>
                    </div>

                    {/* Author and description */}
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 bg-gradient-to-br from-blue-accent to-sky-300 rounded-full flex items-center justify-center mr-4 animate-pulse"
                          style={{ animationDuration: "2s" }}
                        >
                          <div
                            className="text-xl animate-bounce"
                            style={{ animationDelay: "0.5s" }}
                          >
                            👤
                          </div>
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {slide.subtitle}
                          </h2>
                          <p
                            className="text-blue-light text-lg md:text-xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></p>
                        </div>
                      </div>

                      {/* Research description with animated icon */}
                      <div className="flex items-center mt-6">
                        <div
                          className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-4 animate-spin"
                          style={{ animationDuration: "6s" }}
                        >
                          <div className="text-lg">🔬</div>
                        </div>
                        <p className="text-blue-light text-lg md:text-xl font-medium">
                          {slide.content}
                        </p>
                      </div>

                      {/* Key technologies badges with animations */}
                      <div className="flex flex-wrap gap-3 mt-8">
                        <div
                          className="bg-gradient-to-r from-blue-primary to-blue-secondary px-4 py-2 rounded-full border border-blue-accent border-opacity-50 animate-pulse"
                          style={{
                            animationDelay: "2s",
                            animationDuration: "3s",
                          }}
                        >
                          <span className="text-white text-sm font-semibold">
                            🤖 Multi-LLM
                          </span>
                        </div>
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-full border border-purple-300 border-opacity-50 animate-pulse"
                          style={{
                            animationDelay: "2.5s",
                            animationDuration: "3s",
                          }}
                        >
                          <span className="text-white text-sm font-semibold">
                            📊 Sentiment Analysis
                          </span>
                        </div>
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full border border-emerald-300 border-opacity-50 animate-pulse"
                          style={{
                            animationDelay: "3s",
                            animationDuration: "3s",
                          }}
                        >
                          <span className="text-white text-sm font-semibold">
                            💹 Financial LLM
                          </span>
                        </div>
                      </div>

                      {/* Paper link */}
                      {slide.paperLink && (
                        <div className="mt-8 pt-6 border-t border-blue-200/30">
                          <div className="flex items-center">
                            <div
                              className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 animate-pulse"
                              style={{ animationDuration: "2s" }}
                            >
                              <div className="text-lg">📄</div>
                            </div>
                            <div>
                              <p className="text-blue-light text-sm font-medium mb-1">
                                Research Paper
                              </p>
                              <a
                                href={slide.paperLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-lg font-semibold hover:text-blue-200 transition-colors duration-300 underline decoration-blue-300 hover:decoration-blue-200"
                              >
                                View on arXiv →
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "introduction":
        return (
          <div className="slide content-slide relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-100/20 to-transparent rounded-full"></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-sky-100/10 to-blue-100/10 rounded-full animate-pulse"
                style={{ animationDuration: "4s" }}
              ></div>
            </div>

            <div className="slide-content relative z-10 pt-8 pb-20">
              <div className="grid grid-cols-12 gap-6 items-start">
                {/* Left side - Title and content */}
                <div className="col-span-7">
                  <div className="relative mb-6">
                    <div className="absolute -left-2 -top-2 w-full h-full bg-gradient-to-r from-blue-200/30 to-cyan-200/20 rounded-lg"></div>
                    <h1 className="relative text-2xl md:text-3xl font-bold mb-4 text-left border-l-4 border-blue-accent pl-4 bg-white/10 backdrop-blur-sm rounded-r-lg py-2">
                      {slide.title}
                    </h1>
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-accent to-cyan-400 rounded-full ml-4 animate-pulse mb-4"></div>

                  <div className="space-y-3">
                    {Array.isArray(slide.content) &&
                      slide.content.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/25"
                        >
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-lg">
                              <span className="text-white font-bold text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <p
                              className="text-sm leading-relaxed text-gray-800 font-medium"
                              dangerouslySetInnerHTML={{ __html: item }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Right side - Central image/icon */}
                <div className="col-span-5 flex items-center justify-center h-full">
                  <div className="relative flex items-center justify-center w-full h-full">
                    {/* Central illustration with financial analytics theme */}
                    <div className="w-72 h-72 bg-gradient-to-br from-blue-100/50 to-cyan-100/30 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/30">
                      <div className="w-56 h-56 bg-gradient-to-br from-blue-200/60 to-cyan-200/40 rounded-full flex items-center justify-center">
                        <div className="text-7xl animate-pulse">📈</div>
                      </div>
                    </div>

                    {/* Floating tech icons around the central image - centered positioning */}
                    <div
                      className="absolute top-8 right-8 w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                      style={{ animationDelay: "0s", animationDuration: "3s" }}
                    >
                      <span className="text-xl">🤖</span>
                    </div>
                    <div
                      className="absolute bottom-8 left-8 w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                      style={{ animationDelay: "1s", animationDuration: "3s" }}
                    >
                      <span className="text-xl">📊</span>
                    </div>
                    <div
                      className="absolute top-1/2 left-4 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                      style={{ animationDelay: "2s", animationDuration: "3s" }}
                    >
                      <span className="text-lg">�</span>
                    </div>
                    <div
                      className="absolute top-1/2 right-4 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                      style={{
                        animationDelay: "1.5s",
                        animationDuration: "3s",
                      }}
                    >
                      <span className="text-lg">�</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "process":
        return (
          <div className="slide content-slide relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-bl from-blue-100/15 to-transparent rounded-full animate-pulse"
                style={{ animationDuration: "6s" }}
              ></div>
              <div
                className="absolute bottom-10 left-10 w-60 h-60 bg-gradient-to-tr from-cyan-100/15 to-transparent rounded-full animate-pulse"
                style={{ animationDuration: "8s", animationDelay: "2s" }}
              ></div>
            </div>

            <div className="slide-content relative z-10">
              <h1 className="slide-title text-center mb-6 text-gray-800">
                {slide.title}
              </h1>
              <div className="grid grid-cols-12 gap-6 items-start viewport-fit">
                {/* Left side - Timeline */}
                <div className="col-span-6">
                  <div className="relative mx-auto max-w-lg">
                    {/* Enhanced vertical timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-500 rounded-full shadow-sm"></div>

                    <div className="space-y-4">
                      {Array.isArray(slide.content) &&
                        slide.content.map((item, index) => (
                          <div
                            key={index}
                            className="relative flex items-start"
                          >
                            {/* Enhanced timeline node */}
                            <div className="relative z-10 flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-blue-200/50">
                                <span className="text-white font-bold text-base">
                                  {index + 1}
                                </span>
                              </div>
                              {/* Enhanced connecting line */}
                              <div className="absolute top-5 left-10 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                            </div>

                            {/* Enhanced timeline content */}
                            <div className="ml-6 flex-1">
                              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-blue-200/50 hover:shadow-2xl transition-all duration-300 hover:bg-white/95">
                                {/* Timeline arrow */}
                                <div className="absolute left-0 top-5 w-0 h-0 border-t-2 border-b-2 border-r-4 border-t-transparent border-b-transparent border-r-white/90 transform -translate-x-1"></div>

                                <h3 className="text-blue-600 font-bold text-base mb-1">
                                  {item
                                    .match(
                                      /Step \d+: <strong>([^<]+)<\/strong>/
                                    )?.[1]
                                    ?.trim() || `Step ${index + 1}`}
                                </h3>
                                <p
                                  className="text-xs md:text-sm leading-relaxed text-gray-700"
                                  dangerouslySetInnerHTML={{
                                    __html: item.replace(
                                      /^Step \d+: <strong>[^<]+<\/strong> - /,
                                      ""
                                    ),
                                  }}
                                />

                                {/* Enhanced step indicator */}
                                <div className="absolute top-1 right-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                                  Step {index + 1}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* Right side - Flowchart */}
                <div className="col-span-6 flex items-center justify-center h-full">
                  {slide.image && (
                    <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm shadow-xl">
                      <img
                        src={slide.image}
                        alt="Process Flowchart"
                        width={700}
                        height={550}
                        className="w-full h-auto rounded-lg shadow-lg object-contain"
                        onError={(e) => {
                          console.error("Failed to load image:", slide.image);
                          e.currentTarget.style.border = "2px solid red";
                        }}
                        onLoad={() =>
                          console.log("Image loaded successfully:", slide.image)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "signals":
        return (
          <div className="slide content-slide relative overflow-visible">
            {/* Enhanced background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-white/90"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-lg animate-bounce"></div>

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-60"></div>
            <div
              className="absolute top-3/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-50"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/4 w-4 h-4 bg-pink-300 rounded-full animate-float opacity-40"
              style={{ animationDelay: "2s" }}
            ></div>

            <div className="slide-content relative z-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">
                      🧠
                    </span>
                  </div>
                </div>
                <h1 className="slide-title text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {slide.title}
                </h1>
              </div>

              <div className="w-full overflow-visible px-4">
                {/* Main content layout: left content, center table, right content */}
                <div className="grid grid-cols-12 gap-4 items-center max-w-6xl w-full mx-auto">
                  {/* Left side - First 3 signal definitions */}
                  <div className="col-span-3">
                    <div className="space-y-3">
                      {Array.isArray(slide.content) &&
                        slide.content.slice(0, 3).map((item, index) => {
                          const [signalName, description] = item.split(": ");
                          return (
                            <div
                              key={index}
                              className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border-l-4 border-gradient-to-b from-purple-400 to-pink-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90"
                            >
                              <h3
                                className="text-sm md:text-base font-bold text-gray-800 mb-2"
                                dangerouslySetInnerHTML={{ __html: signalName }}
                              />
                              <p
                                className="text-gray-700 leading-relaxed text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: description,
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Center - Table Image */}
                  <div className="col-span-6 flex justify-center">
                    {slide.image && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <img
                          src={slide.image}
                          alt="Signals Table"
                          width={500}
                          height={380}
                          className="w-full h-auto rounded-lg shadow-lg object-contain"
                          onError={(e) => {
                            console.error("Failed to load image:", slide.image);
                            e.currentTarget.style.border = "2px solid red";
                          }}
                          onLoad={() =>
                            console.log(
                              "Image loaded successfully:",
                              slide.image
                            )
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Right side - Last 3 signal definitions */}
                  <div className="col-span-3">
                    <div className="space-y-3">
                      {Array.isArray(slide.content) &&
                        slide.content.slice(3, 6).map((item, index) => {
                          const [signalName, description] = item.split(": ");
                          return (
                            <div
                              key={index + 3}
                              className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border-l-4 border-gradient-to-b from-purple-400 to-pink-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90"
                            >
                              <h3
                                className="text-sm md:text-base font-bold text-gray-800 mb-2"
                                dangerouslySetInnerHTML={{ __html: signalName }}
                              />
                              <p
                                className="text-gray-700 leading-relaxed text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: description,
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "comparison":
        return (
          <div className="slide content-slide relative overflow-hidden">
            {/* Enhanced background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-blue-50/60 to-white/90"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-yellow-200/20 to-green-200/20 rounded-full blur-lg animate-bounce"></div>

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-float opacity-60"></div>
            <div
              className="absolute top-3/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-50"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/4 w-4 h-4 bg-yellow-300 rounded-full animate-float opacity-40"
              style={{ animationDelay: "2s" }}
            ></div>

            <div className="slide-content relative z-10 pb-16">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-xl shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">
                        📊
                      </span>
                    </div>
                  </div>
                  <h1 className="slide-title bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Top section - Methodology in horizontal layout */}
                <div className="w-full">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-2 gap-2">
                      {Array.isArray(slide.content) &&
                        slide.content.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                            <div className="bg-gradient-to-r from-green-100/80 to-blue-100/80 rounded-lg p-2 flex-grow border border-green-200/50 hover:border-blue-300/50 transition-all duration-300">
                              <p
                                className="text-gray-800 text-xs leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* Bottom section - Model Comparison Table */}
                <div className="w-full">
                  <div className="bg-white/85 backdrop-blur-sm rounded-xl p-4 overflow-hidden shadow-xl border border-green-200/50">
                    <h3 className="text-gray-800 font-bold text-base md:text-lg mb-4 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Model Performance Comparison
                    </h3>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-green-500 to-blue-500">
                            <th className="px-3 py-2 text-left text-white font-semibold text-xs border-r border-white/20">
                              Models
                            </th>
                            <th className="px-2 py-2 text-center text-white font-semibold text-xs border-r border-white/20">
                              50%
                              <br />
                              Acc
                            </th>
                            <th className="px-2 py-2 text-center text-white font-semibold text-xs border-r border-white/20">
                              F1
                            </th>
                            <th className="px-2 py-2 text-center text-white font-semibold text-xs border-r border-white/20">
                              66%
                              <br />
                              Acc
                            </th>
                            <th className="px-2 py-2 text-center text-white font-semibold text-xs border-r border-white/20">
                              F1
                            </th>
                            <th className="px-2 py-2 text-center text-white font-semibold text-xs border-r border-white/20">
                              75%
                              <br />
                              Acc
                            </th>
                            <th className="px-2 py-2 text-center text-white font-semibold text-xs border-r border-white/20">
                              F1
                            </th>
                            <th className="px-2 py-2 text-center text-white font-semibold text-xs border-r border-white/20">
                              100%
                              <br />
                              Acc
                            </th>
                            <th className="px-2 py-2 text-center text-white font-semibold text-xs">
                              F1
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {slide.tableData &&
                            slide.tableData.map((row: any, index) => (
                              <tr
                                key={index}
                                className={`hover:bg-green-50/80 transition-colors duration-200 ${
                                  index % 2 === 0
                                    ? "bg-white/90"
                                    : "bg-gray-50/90"
                                }`}
                              >
                                <td className="px-3 py-2 text-gray-800 text-xs font-semibold border-r border-gray-200">
                                  {row.model}
                                </td>
                                <td
                                  className="px-2 py-2 text-center text-gray-700 text-xs border-r border-gray-200"
                                  dangerouslySetInnerHTML={{
                                    __html: row.acc50,
                                  }}
                                />
                                <td
                                  className="px-2 py-2 text-center text-gray-700 text-xs border-r border-gray-200"
                                  dangerouslySetInnerHTML={{
                                    __html: row.f1_50,
                                  }}
                                />
                                <td
                                  className="px-2 py-2 text-center text-gray-700 text-xs border-r border-gray-200"
                                  dangerouslySetInnerHTML={{
                                    __html: row.acc66,
                                  }}
                                />
                                <td
                                  className="px-2 py-2 text-center text-gray-700 text-xs border-r border-gray-200"
                                  dangerouslySetInnerHTML={{
                                    __html: row.f1_66,
                                  }}
                                />
                                <td
                                  className="px-2 py-2 text-center text-gray-700 text-xs border-r border-gray-200"
                                  dangerouslySetInnerHTML={{
                                    __html: row.acc75,
                                  }}
                                />
                                <td
                                  className="px-2 py-2 text-center text-gray-700 text-xs border-r border-gray-200"
                                  dangerouslySetInnerHTML={{
                                    __html: row.f1_75,
                                  }}
                                />
                                <td
                                  className="px-2 py-2 text-center text-gray-700 text-xs border-r border-gray-200"
                                  dangerouslySetInnerHTML={{
                                    __html: row.acc100,
                                  }}
                                />
                                <td
                                  className="px-2 py-2 text-center text-gray-700 text-xs"
                                  dangerouslySetInnerHTML={{
                                    __html: row.f1_100,
                                  }}
                                />
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "analysis":
        return (
          <div className="slide content-slide relative overflow-visible">
            {/* Enhanced background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-red-50/60 to-white/90"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-yellow-200/20 to-orange-200/20 rounded-full blur-lg animate-bounce"></div>

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-400 rounded-full animate-float opacity-60"></div>
            <div
              className="absolute top-3/4 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-float opacity-50"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/4 w-4 h-4 bg-yellow-300 rounded-full animate-float opacity-40"
              style={{ animationDelay: "2s" }}
            ></div>

            <div className="slide-content relative z-10 pt-8 pb-24">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-lg">
                      📈
                    </span>
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-center leading-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {slide.title}
                </h1>
              </div>

              <div className="w-full space-y-4 overflow-visible">
                {/* Main layout: left content and right table */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Left side - Other analysis content (first 4 items) */}
                  <div className="col-span-6">
                    <div className="grid grid-cols-1 gap-3">
                      {Array.isArray(slide.content) &&
                        slide.content.slice(0, 4).map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-orange-300/50 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <div className="flex items-start">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 bg-gradient-to-r from-blue-400 to-cyan-400">
                                  <span className="text-white font-bold text-xs">
                                    {index + 1}
                                  </span>
                                </div>
                                <p
                                  className="text-gray-800 leading-relaxed text-sm font-medium"
                                  dangerouslySetInnerHTML={{ __html: item }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Right side - Table and parameter explanations */}
                  <div className="col-span-6">
                    {/* DCC-GARCH Results Table */}
                    <div className="bg-white/85 backdrop-blur-sm rounded-xl p-3 overflow-hidden shadow-xl border border-orange-200/50 mb-3">
                      <h3 className="text-gray-800 font-bold text-sm mb-3 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        DCC-GARCH Results
                      </h3>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-gradient-to-r from-orange-500 to-red-500">
                              <th className="px-2 py-1 text-left text-white font-semibold text-xs border-r border-white/20">
                                Name
                              </th>
                              <th className="px-1 py-1 text-center text-white font-semibold text-xs border-r border-white/20">
                                α
                              </th>
                              <th className="px-1 py-1 text-center text-white font-semibold text-xs border-r border-white/20">
                                β
                              </th>
                              <th className="px-1 py-1 text-center text-white font-semibold text-xs">
                                ρ̄
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {slide.tableData &&
                              slide.tableData.map((row: any, index) => (
                                <tr
                                  key={index}
                                  className={`hover:bg-orange-50/80 transition-colors duration-200 ${
                                    index % 2 === 0
                                      ? "bg-white/90"
                                      : "bg-gray-50/90"
                                  }`}
                                >
                                  <td className="px-2 py-1 text-gray-800 font-semibold text-xs border-r border-gray-200">
                                    {row.name}
                                  </td>
                                  <td className="px-1 py-1 text-center text-gray-700 text-xs border-r border-gray-200">
                                    {row.alpha}
                                  </td>
                                  <td className="px-1 py-1 text-center text-gray-700 text-xs border-r border-gray-200">
                                    {row.beta}
                                  </td>
                                  <td className="px-1 py-1 text-center text-gray-700 text-xs">
                                    {row.meanRho}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Parameter explanations under the table */}
                    <div className="grid grid-cols-1 gap-2">
                      {Array.isArray(slide.content) &&
                        slide.content.slice(4, 7).map((item, index) => {
                          return (
                            <div
                              key={index + 4}
                              className="bg-gradient-to-r from-orange-100/90 to-red-100/90 border border-orange-300/50 hover:border-red-300/50 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <div className="flex items-start">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 bg-gradient-to-r from-orange-400 to-red-400">
                                  <span className="text-white font-bold text-xs">
                                    {index + 5}
                                  </span>
                                </div>
                                <p
                                  className="text-gray-800 leading-relaxed text-xs font-medium"
                                  dangerouslySetInnerHTML={{ __html: item }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="w-full h-full scale-[0.85] md:scale-90 lg:scale-95 xl:scale-100 origin-center">
        {renderSlide(slides[currentSlide])}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black bg-opacity-70 rounded-lg px-4 py-2">
        <button
          onClick={prevSlide}
          className="text-white hover:text-blue-accent transition-colors text-lg font-bold"
          aria-label="Previous slide"
        >
          ←
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-blue-accent" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="text-white hover:text-blue-accent transition-colors text-lg font-bold"
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-8 right-8 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-lg font-bold">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Keyboard Instructions */}
      <div className="fixed top-8 left-8 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-base">
        Use ← → keys or space to navigate
      </div>
    </div>
  );
}
