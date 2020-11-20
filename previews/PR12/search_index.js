var documenterSearchIndex = {"docs":
[{"location":"SymbolicPermutation/#Permutation-(symbolic)","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"","category":"section"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"SymbolicPermutation","category":"page"},{"location":"SymbolicPermutation/#Entropies.SymbolicPermutation","page":"Permutation (symbolic)","title":"Entropies.SymbolicPermutation","text":"SymbolicPermutation <: PermutationProbabilityEstimator\n\nA symbolic, permutation based probabilities/entropy estimator.\n\nDescription\n\nPermutations of a signal preserve ordinal patterns (sorting information). The implementation  here is based on Bandt & Pompe et al. (2002)[BandtPompe2002].\n\nFrom univariate time series\n\nConsider the n-element univariate time series x(t) = x_1 x_2 ldots x_n.  Let mathbfx_i^m tau = x_j x_j+tau ldots x_j+(m-1)tau  for j = 1 2 ldots n - (m-1)tau be the i-th state vector in a delay  reconstruction with embedding dimension m and reconstruction lag tau.  There are then N = n - (m-1)tau state vectors. \n\nFor an m-dimensional vector, there are m possible ways of sorting it in  ascending order of magnitude. Each such possible sorting ordering is called a  motif. Let pi_i^m tau denote the motif associated with the  m-dimensional state vector mathbfx_i^m tau, and let R  be the number of distinct motifs that can be constructed from the N state  vectors. Then there are at most R motifs; R = N precisely when all motifs  are unique, and R = 1 when all motifs are the same.\n\nEach unique motif pi_i^m tau can be mapped to a unique integer  symbol 0 leq s_i leq M-1. Let S(pi)  mathbbR^m to mathbbN_0 be  the function that maps the motif pi to its symbol s, and let Pi  denote the set of symbols Pi =  s_i _iin  1 ldots R.\n\nThe probability of a given motif is its frequency of occurrence, normalized by the total  number of motifs,\n\np(pi_i^m tau) = dfracsum_k=1^N mathbf1_uS(u) = s_i left(mathbfx_k^m tau right) sum_k=1^N mathbf1_uS(u) in Pi left(mathbfx_k^m tau right) = dfracsum_k=1^N mathbf1_uS(u) = s_i left(mathbfx_k^m tau right) N\n\nwhere the function mathbf1_A(u) is the indicator function of a set A. That      is, mathbf1_A(u) = 1 if u in A, and mathbf1_A(u) = 0 otherwise.\n\nPermutation entropy can be computed over the probability distribution of symbols  as H(m tau) = - sum_j^R p(pi_j^m tau) ln p(pi_j^m tau).\n\nEstimation\n\nTo compute permutation entropy for a univariate signal x, use the signature    entropy(x::AbstractVector, est::SymbolicPermutation; τ::Int = 1, m::Int = 3).\nThe corresponding (unordered) probability distribution of the permutation symbols for a    univariate signal x can be computed using probabilities(x::AbstractVector, est::SymbolicPermutation; τ::Int = 1, m::Int = 3). \n\nNote: by default, embedding dimension m = 3 with embedding lag 1 is used. You  should probably make a more informed decision about embedding parameters when computing  the permutation entropy of a real dataset. In all cases, m must be at least 2 (there  are no permutations of a single-element state vector, so need m geq 2).\n\nFrom multivariate time series/datasets\n\nPermutation entropy can also be computed for multivariate datasets (either embedded or  consisting of multiple time series variables). Then,  just skip the delay reconstruction step, compute symbols directly from the L existing  state vectors mathbfx_1 mathbfx_2 ldots mathbfx_L, symbolize  each mathbfx_i precisely as above, then compute the  quantity \n\nH = - sum_j p(pi) ln p(pi_j)\n\nTo compute permutation entropy for a multivariate/embedded dataset x, use the    signature entropy(x::Dataset, est::SymbolicPermutation).\nTo get the probability distribution for a multivariate/embedded dataset x, use    probabilities(x::Dataset, est::SymbolicPermutation).\n\n[BandtPompe2002]: Bandt, Christoph, and Bernd Pompe. \"Permutation entropy: a natural  complexity measure for time series.\" Physical review letters 88.17 (2002): 174102.\n\n\n\n\n\n","category":"type"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"entropy(x::Dataset, est::SymbolicPermutation)","category":"page"},{"location":"SymbolicPermutation/#Entropies.entropy-Tuple{Dataset,SymbolicPermutation}","page":"Permutation (symbolic)","title":"Entropies.entropy","text":"entropy(x::Dataset, est::SymbolicPermutation, α::Real = 1; m::Int = 3, τ::Int = 1, base = 2) → Real\nentropy(x::AbstractVector, est::SymbolicPermutation, α::Real = 1; m::Int = 3, τ::Int = 1, base = 2) → Real\n\nentropy!(s::Vector{Int}, x::Dataset, est::SymbolicPermutation, α::Real = 1; m::Int = 3, τ::Int = 1, base = 2) → Real\nentropy!(s::Vector{Int}, x::AbstractVector, est::SymbolicPermutation, α::Real = 1; m::Int = 3, τ::Int = 1, base = 2) → Real\n\nCompute the generalized order α entropy over a permutation symbolization of x, using  symbol size/order m. \n\nIf x is a multivariate Dataset, then symbolization is performed directly on the state  vectors. If x is a univariate signal, then a delay reconstruction with embedding lag τ  and embedding dimension m is used to construct state vectors, on which symbolization is  then performed.\n\nA pre-allocated symbol array s can be provided to save some memory allocations if   probabilities are to be computed for multiple data sets. If so, it is required that  length(x) == length(s) if x is a Dataset, or  length(s) == length(x) - (m-1)τ  if x is a univariate signal.\n\nProbability estimation\n\nAn unordered symbol frequency histogram is obtained by symbolizing the points in x, using probabilities(::Dataset, ::SymbolicPermutation). Sum-normalizing this histogram yields a probability distribution over the symbols.\n\nEntropy estimation\n\nAfter the symbolization histogram/distribution has been obtained, the order α generalized  entropy[Rényi1960], to the given base, is computed from that sum-normalized symbol  distribution, using genentropy.\n\nNotes\n\nDo not confuse the order of the generalized entropy (α) with the order m of the  permutation entropy (m, which controls the symbol size). Permutation entropy is usually  estimated with α = 1, but the implementation here allows the generalized entropy of any  dimension to be computed from the symbol frequency distribution.\n\n[Rényi1960]: A. Rényi, Proceedings of the fourth Berkeley Symposium on Mathematics, Statistics and Probability, pp 547 (1960)\n\nSee also: SymbolicPermutation, genentropy.\n\n\n\n\n\n","category":"method"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"probabilities(x::Dataset, est::SymbolicPermutation)","category":"page"},{"location":"SymbolicPermutation/#Entropies.probabilities-Tuple{Dataset,SymbolicPermutation}","page":"Permutation (symbolic)","title":"Entropies.probabilities","text":"probabilities(x::Dataset, est::SymbolicPermutation) → Vector{<:Real} \nprobabilities(x::AbstractVector, est::SymbolicPermutation;  m::Int = 2, τ::Int = 1) → Vector{<:Real} \n\nprobabilities!(s::Vector{Int}, x::Dataset, est::SymbolicPermutation) → Vector{<:Real} \nprobabilities!(s::Vector{Int}, x::AbstractVector, est::SymbolicPermutation;  m::Int = 2, τ::Int = 1) → Vector{<:Real}\n\nCompute the unordered probabilities of the occurrence of symbol sequences constructed from  the data x. \n\nIf x is a multivariate Dataset, then symbolization is performed directly on the state  vectors. If x is a univariate signal, then a delay reconstruction with embedding lag τ  and embedding dimension m is used to construct state vectors, on which symbolization is  then performed.\n\nA pre-allocated symbol array s can be provided to save some memory allocations if the  probabilities are to be computed for multiple data sets. If so, it is required that  length(x) == length(s) if x is a Dataset, or  length(s) == length(x) - (m-1)τ  if x is a univariate signal.\n\nSee also: SymbolicPermutation.\n\n\n\n\n\n","category":"method"},{"location":"SymbolicPermutation/#Example","page":"Permutation (symbolic)","title":"Example","text":"","category":"section"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"This example reproduces the permutation entropy example on the logistic map from Bandt and Pompe (2002).","category":"page"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"using DynamicalSystems, PyPlot, Entropies\n\nds = Systems.logistic()\nrs = 3.5:0.001:4\nN_lyap, N_ent = 100000, 10000\nm = 6 # Symbol size/dimension\n\n# Generate one time series for each value of the logistic parameter r\nlyaps, hs_entropies, hs_chaostools = Float64[], Float64[], Float64[]\nhs_wtperm = Float64[]\nfor r in rs\n    ds.p[1] = r\n    push!(lyaps, lyapunov(ds, N_lyap))\n    \n    # For 1D systems `trajectory` returns a vector, so embed it using τs\n    # to get the correct 6d dimension on the embedding\n    x = trajectory(ds, N_ent)\n    τs = ([-i for i in 0:m-1]...,) # embedding lags\n    emb = genembed(x, τs)\n\n    push!(hs_entropies, entropy(emb, SymbolicPermutation(), base = Base.MathConstants.e))\n    push!(hs_wtperm, entropy(emb, SymbolicWeightedPermutation(), base = Base.MathConstants.e))\n\n    # Old ChaosTools.jl style estimation\n    push!(hs_chaostools, permentropy(x, 6))\nend\n\nf = figure(figsize = (10,6))\na1 = subplot(411)\nplot(rs, lyaps); ylim(-2, log(2)); ylabel(\"\\$\\\\lambda\\$\")\na1.axes.get_xaxis().set_ticklabels([])\nxlim(rs[1], rs[end]);\n\na2 = subplot(412)\nplot(rs, hs_chaostools; color = \"C1\"); xlim(rs[1], rs[end]);\nxlabel(\"\\$r\\$\"); ylabel(\"\\$h_6 (ChaosTools.jl)\\$\")\n\na3 = subplot(413)\nplot(rs, hs_entropies; color = \"C2\"); xlim(rs[1], rs[end]);\nxlabel(\"\\$r\\$\"); ylabel(\"\\$h_6 (Entropies.jl)\\$\")\n\na4 = subplot(414)\nplot(rs, hs_wtperm; color = \"C3\"); xlim(rs[1], rs[end]);\nxlabel(\"\\$r\\$\"); ylabel(\"\\$h_6 (Entropies.jl, wtperm)\\$\")\ntight_layout()\nsavefig(\"permentropy.png\")","category":"page"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"(Image: )","category":"page"},{"location":"SymbolicPermutation/#Utils","page":"Permutation (symbolic)","title":"Utils","text":"","category":"section"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"Some convenience functions for symbolization are provided.","category":"page"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"symbolize\nencode_motif","category":"page"},{"location":"SymbolicPermutation/#Entropies.symbolize","page":"Permutation (symbolic)","title":"Entropies.symbolize","text":"symbolize(x::Dataset, est::SymbolicPermutation) → Vector{Int}\n\nSymbolize the vectors in x using Algorithm 1 from Berger et al. (2019)[Berger2019].\n\nThe symbol length is automatically determined from the dimension of the input data vectors.\n\nExample\n\nComputing the order 5 permutation entropy for a 7-dimensional dataset.\n\nusing DelayEmbeddings, Entropies\nD = Dataset([rand(7) for i = 1:1000])\nsymbolize(D, SymbolicPermutation(5))\n\n[Berger2019]: Berger, Sebastian, et al. \"Teaching Ordinal Patterns to a Computer: Efficient Encoding Algorithms Based on the Lehmer Code.\" Entropy 21.10 (2019): 1023.\n\n\n\n\n\n","category":"function"},{"location":"SymbolicPermutation/#Entropies.encode_motif","page":"Permutation (symbolic)","title":"Entropies.encode_motif","text":"encode_motif(x, m::Int = length(x)) → Int\n\nEncode the length-m motif x (a vector of indices that would sort some vector v in ascending order)  into its unique integer symbol, using Algorithm 1 in Berger et al. (2019)[Berger2019].\n\nNote: no error checking is done to see if length(x) == m, so be sure to provide the correct motif length!\n\nExample\n\n# Some random vector\nv = rand(5)\n\n# The indices that would sort `v` in ascending order. This is now a permutation \n# of the index permutation (1, 2, ..., 5)\nx = sortperm(v)\n\n# Encode this permutation as an integer.\nencode_motif(x)\n\n[Berger2019]: Berger, Sebastian, et al. \"Teaching Ordinal Patterns to a Computer: Efficient Encoding Algorithms Based on the Lehmer Code.\" Entropy 21.10 (2019): 1023.\n\n\n\n\n\n","category":"function"},{"location":"histogram_estimation/#Histogram-estimation","page":"Histrogram estimation","title":"Histogram estimation","text":"","category":"section"},{"location":"histogram_estimation/","page":"Histrogram estimation","title":"Histrogram estimation","text":"Entropies.non0hist(x::AbstractVector{T}) where T<:Real","category":"page"},{"location":"histogram_estimation/#Entropies.non0hist-Union{Tuple{AbstractArray{T,1}}, Tuple{T}} where T<:Real","page":"Histrogram estimation","title":"Entropies.non0hist","text":"non0hist(x::AbstractVector; normalize::Bool = true) → p::Vector{Float64}\nnon0hist(D::Dataset; normalize::Bool = true) → p::Vector{Float64}\n\nCompute the (sum-normalized, if normalize==true) unordered histogram of the values of  x. Assumes x can be sorted.\n\nExample\n\nusing Entropies\nx = rand(1:10, 100000)\nEntropies.non0hist(x) # sum-normalized\nEntropies.non0hist(x, normalize = false) # histogram (counts)\n\nusing DelayEmbeddings, Entropies\nD = Dataset(rand(1:3, 50000, 3))\nEntropies.non0hist(D) # sum-normalized\nEntropies.non0hist(D, normalize = false) # histogram (counts)\n\n\n\n\n\n","category":"method"},{"location":"generalized_entropy/#Generalized-entropy","page":"Generalized entropy","title":"Generalized entropy","text":"","category":"section"},{"location":"generalized_entropy/","page":"Generalized entropy","title":"Generalized entropy","text":"Entropies.genentropy","category":"page"},{"location":"generalized_entropy/#Entropies.genentropy","page":"Generalized entropy","title":"Entropies.genentropy","text":"genentropy(α::Real, p::AbstractArray; base = Base.MathConstants.e)\n\nCompute the entropy, to the given base, of an array of probabilities p, assuming  that p is sum-normalized.\n\nDescription\n\nLet p be an array of probabilities (summing to 1). Then the Rényi entropy is\n\nH_alpha(p) = frac11-alpha log left(sum_i pi^alpharight)\n\nand generalizes other known entropies, like e.g. the information entropy (alpha = 1, see [Shannon1948]), the maximum entropy (alpha=0, also known as Hartley entropy), or the correlation entropy (alpha = 2, also known as collision entropy).\n\nExample\n\nusing Entropies\np = rand(5000)\np = p ./ sum(p) # normalizing to 1 ensures we have a probability distribution\n\n# Estimate order-1 generalized entropy to base 2 of the distribution\nEntropies.genentropy(1, ps, base = 2)\n\nusing DelayEmbeddings, Entropies\n\n# Some random data, and its corresponding sum-normalized histogram (which sums to 1, so is a \n# probability distribution)\nD = Dataset(rand(1:3, 10000, 3))\nps = Entropies.non0hist(D)\n\n# Estimate order-1 generalized entropy to base 2 of the distribution\nEntropies.genentropy(1, ps, base = 2)\n\nSee also: non0hist.\n\n[Rényi1960]: A. Rényi, Proceedings of the fourth Berkeley Symposium on Mathematics, Statistics and Probability, pp 547 (1960)\n\n[Shannon1948]: C. E. Shannon, Bell Systems Technical Journal 27, pp 379 (1948)\n\n\n\n\n\ngenentropy(α::Real, x::Dataset, est::VisitationFrequency)\n\nCompute the α order generalized (Rényi) entropy[Rényi1960] of a multivariate dataset x.\n\nDescription\n\nFirst, the state space defined by x is partitioned into rectangular boxes according to  the binning instructions given by est.binning. Then, a histogram of visitations to  each of those boxes is obtained, which is then sum-normalized to obtain a probability  distribution, using probabilities. The generalized entropy to base est.b is  then computed over that box visitation distribution using  genentropy(::Real, ::AbstractArray).\n\nExample\n\nusing DelayEmbeddings, Entropies\n\n# Estimator specification. Split each coordinate axis in five equal segments, and \n# use logarithms to base 2.\nest = VisitationFrequency(RectangularBinning(5), b = 2) \n\n# Estimate order-1 generalized entropy of some random data\nD = Dataset(rand(1:3, 20000, 3))\n\nEntropies.genentropy(1, D, est)\n\nSee also: VisitationFrequency.\n\n\n\n\n\n","category":"function"},{"location":"SymbolicWeightedPermutation/#Weighted-permutation-(symbolic)","page":"Weighted permutation (symbolic)","title":"Weighted permutation (symbolic)","text":"","category":"section"},{"location":"SymbolicWeightedPermutation/","page":"Weighted permutation (symbolic)","title":"Weighted permutation (symbolic)","text":"SymbolicWeightedPermutation","category":"page"},{"location":"SymbolicWeightedPermutation/#Entropies.SymbolicWeightedPermutation","page":"Weighted permutation (symbolic)","title":"Entropies.SymbolicWeightedPermutation","text":"SymbolicWeightedPermutation <: PermutationProbabilityEstimator\n\nA symbolic, weighted permutation based probabilities/entropy estimator.\n\nDescription\n\nWeighted permutations of a signal preserve not only ordinal patterns (sorting information),  but also encodes amplitude. The implementation here is based on  Fadlallah et al. (2013)[Fadlallah2013].\n\nFrom univariate signals\n\nConsider the n-element univariate time series x(t) = x_1 x_2 ldots x_n.  Let mathbfx_i^m tau = x_j x_j+tau ldots x_j+(m-1)tau for  j = 1 2 ldots n - (m-1)tau be the i-th state vector in a delay reconstruction  with embedding dimension m and reconstruction lag tau. There are then  N = n - (m-1)tau state vectors. \n\nFor an m-dimensional vector, there are m possible ways of sorting it in ascending  order of magnitude. Each such possible sorting ordering is called a motif.  Let pi_i^m tau denote the motif associated with the m-dimensional state  vector mathbfx_i^m tau, and let R be the number of distinct motifs that  can be constructed from the N state vectors. Then there are at most R motifs;  R = N precisely when all motifs are unique, and R = 1 when all motifs are the same.  Each unique motif pi_i^m tau can be mapped to a unique integer symbol  0 leq s_i leq M-1. Let S(pi)  mathbbR^m to mathbbN_0 be the  function that maps the motif pi to its symbol s, and let Pi denote the set      of symbols Pi =  s_i _iin  1 ldots R.\n\nWeighted permutation entropy is computed analogously to regular permutation entropy, but  adds weights that encode amplitude information too:\n\np(pi_i^m tau) = dfracsum_k=1^N mathbf1_uS(u) = s_i left( mathbfx_k^m tau right)  w_ksum_k=1^N mathbf1_uS(u) in Pi left( mathbfx_k^m tau right) w_k = dfracsum_k=1^N mathbf1_uS(u) = s_i left( mathbfx_k^m tau right)  w_ksum_k=1^N w_k\n\nThe weighted permutation entropy is equivalent to regular permutation entropy when weights  are positive and identical (w_j = beta  forall  j leq N and  beta  0). There are many different choices of weights, but in  Fadlallah et al. (2013)[Fadlallah2013], weights are dictated by the variance of the  state vectors.\n\nLet the aritmetic mean of state vector mathbfx_i be denoted  by\n\nmathbfhatx_j^m tau = frac1m sum_k=1^m x_j + (k+1)tau\n\nWeights are then computed as \n\nw_j = dfrac1msum_k=1^m (x_j+(k+1)tau - mathbfhatx_j^m tau)^2\n\nDifference between original paper and this implementation\n\nNote: in equation 7, section III, of the original paper, the authors write\n\nw_j = dfrac1msum_k=1^m (x_j-(k-1)tau - mathbfhatx_j^m tau)^2\n\nBut this is not the variance of mathbfx_i, because the indices are mixed:  x_j+(k-1)tau in the weights formula, vs. x_j+(k+1)tau in the arithmetic  mean formula. This seems to imply that amplitude information about previous delay vectors  are mixed with mean amplitude information about current vectors. The authors also mix the  terms \"vector\" and \"neighboring vector\" (but uses the same notation for both), making it  hard to interpret whether the sign switch is a typo or intended. Here, we use the notation  above, which actually computes the variance for mathbfx_i.\n\nEstimation\n\nTo compute weighted permutation entropy for a univariate signal x, use the signature    entropy(x::AbstractVector, est::SymbolicWeightedPermutation; τ::Int = 1, m::Int = 3).\nThe corresponding (unordered) probability distribution of the permutation symbols for a    univariate signal x can be computed using probabilities(x::AbstractVector,    est::SymbolicWeightedPermutation; τ::Int = 1, m::Int = 3).  \n\nNote: by default, embedding dimension m = 3 with embedding lag 1 is used. You  should probably make a more informed decision about embedding parameters when computing the  permutation entropy of a real dataset. In all cases, m must be at least 2 (there are  no permutations of a single-element state vector, so need m geq 2).\n\nFrom multivariate time series/datasets\n\nWeighted permutation entropy, just like regular permutation entropy, is can also be  computed for multivariate datasets (either embedded or consisting of multiple time series  variables). This assumes that the mixed symbols described above are actually a typo). \n\nThen, just skip the delay reconstruction step, compute symbols  directly from the L existing state vectors  mathbfx_1 mathbfx_2 ldots mathbfx_L, symbolize  each mathbfx_i precisely as above, then compute the  quantity \n\nH = - sum_j p(pi) ln p(pi_j)\n\nEstimation\n\nTo compute weighted permutation entropy for a multivariate/embedded dataset x, use the    signature entropy(x::Dataset, est::SymbolicWeightedPermutation).`\nTo get the probability distribution for a multivariate/embedded dataset x, use    probabilities(x::Dataset, est::SymbolicWeightedPermutation).\n\n[Fadlallah2013]: Fadlallah, Bilal, et al. \"Weighted-permutation entropy: A complexity  measure for time series incorporating amplitude information.\" Physical  Review E 87.2 (2013): 022911.\n\n\n\n\n\n","category":"type"},{"location":"SymbolicWeightedPermutation/","page":"Weighted permutation (symbolic)","title":"Weighted permutation (symbolic)","text":"entropy(x::Dataset, est::SymbolicWeightedPermutation, α::Real = 1)","category":"page"},{"location":"SymbolicWeightedPermutation/#Entropies.entropy","page":"Weighted permutation (symbolic)","title":"Entropies.entropy","text":"entropy(x::Dataset, est::SymbolicWeightedPermutation, α::Real = 1; m::Int = 3, τ::Int = 1, base = 2) → Real\nentropy(x::AbstractVector, est::SymbolicWeightedPermutation, α::Real = 1; m::Int = 3, τ::Int = 1, base = 2) → Real\n\nCompute the generalized order α entropy based on a weighted permutation  symbolization of x, using symbol size/order m for the permutations.\n\nIf x is a multivariate Dataset, then symbolization is performed directly on the state  vectors. If x is a univariate signal, then a delay reconstruction with embedding lag τ  and embedding dimension m is used to construct state vectors, on which symbolization is  then performed.\n\nProbability estimation\n\nAn unordered symbol frequency histogram is obtained by symbolizing the points in x by a weighted procedure, using probabilities(::Dataset, ::SymbolicWeightedPermutation). Sum-normalizing this histogram yields a probability distribution over the weighted symbols.\n\nEntropy estimation\n\nAfter the symbolization histogram/distribution has been obtained, the order α generalized  entropy[Rényi1960], to the given base, is computed from that sum-normalized symbol  distribution, using genentropy.\n\nNotes\n\nDo not confuse the order of the generalized entropy (α) with the order m of the  permutation entropy (m, which controls the symbol size). Permutation entropy is usually  estimated with α = 1, but the implementation here allows the generalized entropy of any  dimension to be computed from the symbol frequency distribution.\n\n[Rényi1960]: A. Rényi, Proceedings of the fourth Berkeley Symposium on Mathematics, Statistics and Probability, pp 547 (1960)\n\nSee also: SymbolicWeightedPermutation, genentropy.\n\n\n\n\n\n","category":"function"},{"location":"SymbolicWeightedPermutation/","page":"Weighted permutation (symbolic)","title":"Weighted permutation (symbolic)","text":"probabilities(x::Dataset, est::SymbolicWeightedPermutation)","category":"page"},{"location":"SymbolicWeightedPermutation/#Entropies.probabilities-Tuple{Dataset,SymbolicWeightedPermutation}","page":"Weighted permutation (symbolic)","title":"Entropies.probabilities","text":"probabilities(x::Dataset, est::SymbolicWeightedPermutation) → Vector{<:Real}  \nprobabilities(x::AbstractVector, est::SymbolicWeightedPermutation; m::Int = 3, τ::Int = 1) → Vector{<:Real}\n\nprobabilities!(s::Vector{Int}, x::Dataset, est::SymbolicWeightedPermutation) → Vector{<:Real}  \nprobabilities!(s::Vector{Int}, x::AbstractVector, est::SymbolicWeightedPermutation; m::Int = 3, τ::Int = 1) → Vector{<:Real}\n\nCompute the unordered probabilities of the occurrence of weighted symbol sequences  constructed from x. \n\nIf x is a multivariate Dataset, then symbolization is performed directly on the state  vectors. If x is a univariate signal, then a delay reconstruction with embedding lag τ  and embedding dimension m is used to construct state vectors, on which symbolization is  then performed.\n\nA pre-allocated symbol array s can be provided to save some memory allocations if the  probabilities are to be computed for multiple data sets. If so, it is required that  length(x) == length(s) if x is a Dataset, or  length(s) == length(x) - (m-1)τ  if x is a univariate signal`.\n\nSee also: SymbolicWeightedPermutation.\n\n\n\n\n\n","category":"method"},{"location":"VisitationFrequency/#Visitation-frequency","page":"Visitation frequency","title":"Visitation frequency","text":"","category":"section"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"VisitationFrequency","category":"page"},{"location":"VisitationFrequency/#Entropies.VisitationFrequency","page":"Visitation frequency","title":"Entropies.VisitationFrequency","text":"VisitationFreqency(r::RectangularBinning; b::Real = 2)\n\nA probability estimator based on binning data into rectangular boxes dictated by  the binning scheme r.\n\nIf the estimator is used for entropy computation, then the entropy is computed  to base b (the default b = 2 gives the entropy in bits).\n\nSee also: RectangularBinning.\n\n\n\n\n\n","category":"type"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"entropy(x::Dataset, est::VisitationFrequency)","category":"page"},{"location":"VisitationFrequency/#Entropies.entropy-Tuple{Dataset,VisitationFrequency}","page":"Visitation frequency","title":"Entropies.entropy","text":"entropy(x::Dataset, est::VisitationFrequency, α::Real = 1) → Real\n\nEstimate the generalized order α entropy of x using a visitation frequency approach.  This is done by first estimating the sum-normalized unordered 1D histogram using probabilities, then computing entropy over that histogram/distribution.\n\nThe base b of the logarithms is inferred from the provided estimator  (e.g. est = VisitationFrequency(RectangularBinning(45), b = Base.MathConstants.e).\n\nDescription\n\nLet p be an array of probabilities (summing to 1). Then the Rényi entropy is\n\nH_alpha(p) = frac11-alpha log left(sum_i pi^alpharight)\n\nand generalizes other known entropies, like e.g. the information entropy (alpha = 1, see [Shannon1948]), the maximum entropy (alpha=0, also known as Hartley entropy), or the correlation entropy (alpha = 2, also known as collision entropy).\n\n[Rényi1960]: A. Rényi, Proceedings of the fourth Berkeley Symposium on Mathematics, Statistics and Probability, pp 547 (1960)\n\n[Shannon1948]: C. E. Shannon, Bell Systems Technical Journal 27, pp 379 (1948)\n\nSee also: VisitationFrequency, RectangularBinning.\n\nExample\n\nusing Entropies, DelayEmbeddings\nD = Dataset(rand(100, 3))\n\n# How shall the data be partitioned? Here, we subdivide each \n# coordinate axis into 4 equal pieces over the range of the data, \n# resulting in rectangular boxes/bins (see RectangularBinning).\nϵ = RectangularBinning(4)\n\n# Estimate entropy\nentropy(D, VisitationFrequency(ϵ))\n\n\n\n\n\n","category":"method"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"probabilities(x::Dataset, est::VisitationFrequency)","category":"page"},{"location":"VisitationFrequency/#Entropies.probabilities-Tuple{Dataset,VisitationFrequency}","page":"Visitation frequency","title":"Entropies.probabilities","text":"probabilities(x::Dataset, est::VisitationFrequency) → Vector{Real}\n\nSuperimpose a rectangular grid (bins/boxes) dictated by est over the data x and return  the sum-normalized histogram (i.e. frequency at which the points of x visits the bins/boxes  in the grid) in an unordered 1D form, discarding all non-visited bins and bin edge information.\n\nPerformances Notes\n\nThis method has a linearithmic time complexity (n log(n) for n = length(data)) and a  linear space complexity l for l = dimension(data)). This allows computation of  histograms of high-dimensional datasets and with small box sizes ε without memory  overflow and with maximum performance.\n\nSee also: VisitationFrequency, RectangularBinning.\n\nExample\n\nusing Entropies, DelayEmbeddings\nD = Dataset(rand(100, 3))\n\n# How shall the data be partitioned? \n# Here, we subdivide each coordinate axis into 4 equal pieces\n# over the range of the data, resulting in rectangular boxes/bins\nϵ = RectangularBinning(4)\n\n# Feed partitioning instructions to estimator.\nest = VisitationFrequency(ϵ)\n\n# Estimate a probability distribution over the partition\nprobabilities(D, est)\n\n\n\n\n\n","category":"method"},{"location":"VisitationFrequency/#Specifying-binning/boxes","page":"Visitation frequency","title":"Specifying binning/boxes","text":"","category":"section"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"RectangularBinning","category":"page"},{"location":"VisitationFrequency/#Entropies.RectangularBinning","page":"Visitation frequency","title":"Entropies.RectangularBinning","text":"RectangularBinning(ϵ) <: RectangularBinningScheme\n\nInstructions for creating a rectangular box partition using the binning scheme ϵ.  Binning instructions are deduced from the type of ϵ.\n\nRectangular binnings may be automatically adjusted to the data in which the RectangularBinning  is applied, as follows:\n\nϵ::Int divides each coordinate axis into ϵ equal-length intervals,   extending the upper bound 1/100th of a bin size to ensure all points are covered.\nϵ::Float64 divides each coordinate axis into intervals of fixed size ϵ, starting   from the axis minima until the data is completely covered by boxes.\nϵ::Vector{Int} divides the i-th coordinate axis into ϵ[i] equal-length   intervals, extending the upper bound 1/100th of a bin size to ensure all points are   covered.\nϵ::Vector{Float64} divides the i-th coordinate axis into intervals of fixed size ϵ[i], starting   from the axis minima until the data is completely covered by boxes.\n\nRectangular binnings may also be specified on arbitrary min-max ranges. \n\nϵ::Tuple{Vector{Tuple{Float64,Float64}},Int64} creates intervals   along each coordinate axis from ranges indicated by a vector of (min, max) tuples, then divides   each coordinate axis into an integer number of equal-length intervals. Note: this does not ensure   that all points are covered by the data (points outside the binning are ignored).\n\nExample 1: Grid deduced automatically from data (partition guaranteed to cover data points)\n\nFlexible box sizes\n\nThe following binning specification finds the minima/maxima along each coordinate axis, then  split each of those data ranges (with some tiny padding on the edges) into 10 equal-length  intervals. This gives (hyper-)rectangular boxes, and works for data of any dimension.\n\nusing Entropies\nRectangularBinning(10)\n\nNow, assume the data consists of 2-dimensional points, and that we want a finer grid along one of the dimensions than over the other dimension.\n\nThe following binning specification finds the minima/maxima along each coordinate axis, then  splits the range along the first coordinate axis (with some tiny padding on the edges)  into 10 equal-length intervals, and the range along the second coordinate axis (with some  tiny padding on the edges) into 5 equal-length intervals. This gives (hyper-)rectangular boxes.\n\nusing Entropies\nRectangularBinning([10, 5])\n\nFixed box sizes\n\nThe following binning specification finds the minima/maxima along each coordinate axis,  then split the axis ranges into equal-length intervals of fixed size 0.5 until the all data  points are covered by boxes. This approach yields (hyper-)cubic boxes, and works for  data of any dimension.\n\nusing Entropies\nRectangularBinning(0.5)\n\nAgain, assume the data consists of 2-dimensional points, and that we want a finer grid along one of the dimensions than over the other dimension.\n\nThe following binning specification finds the minima/maxima along each coordinate axis, then splits the range along the first coordinate axis into equal-length intervals of size 0.3, and the range along the second axis into equal-length intervals of size 0.1 (in both cases,  making sure the data are completely covered by the boxes). This approach gives a (hyper-)rectangular boxes. \n\nusing Entropies\nRectangularBinning([0.3, 0.1])\n\nExample 2: Custom grids (partition not guaranteed to cover data points):\n\nAssume the data consists of 3-dimensional points (x, y, z), and that we want a grid  that is fixed over the intervals [x₁, x₂] for the first dimension, over [y₁, y₂] for the second dimension, and over [z₁, z₂] for the third dimension. We when want to split each of those ranges into 4 equal-length pieces. Beware: some points may fall  outside the partition if the intervals are not chosen properly (these points are  simply discarded). \n\nThe following binning specification produces the desired (hyper-)rectangular boxes. \n\nusing Entropies, DelayEmbeddings\n\nD = Dataset(rand(100, 3));\n\nx₁, x₂ = 0.5, 1 # not completely covering the data, which are on [0, 1]\ny₁, y₂ = -2, 1.5 # covering the data, which are on [0, 1]\nz₁, z₂ = 0, 0.5 # not completely covering the data, which are on [0, 1]\n\nϵ = [(x₁, x₂), (y₁, y₂), (z₁, z₂)], 4 # [interval 1, interval 2, ...], n_subdivisions\n\nRectangularBinning(ϵ)\n\n\n\n\n\n","category":"type"},{"location":"VisitationFrequency/#Utils","page":"Visitation frequency","title":"Utils","text":"","category":"section"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"Some convenience functions for symbolization are provided.","category":"page"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"encode_as_bin\njoint_visits\nmarginal_visits","category":"page"},{"location":"VisitationFrequency/#Entropies.encode_as_bin","page":"Visitation frequency","title":"Entropies.encode_as_bin","text":"encode_as_bin(point, reference_point, edgelengths) → Vector{Int}\n\nEncode a point into its integer bin labels relative to some reference_point (always counting from lowest to highest magnitudes), given a set of box  edgelengths (one for each axis). The first bin on the positive side of  the reference point is indexed with 0, and the first bin on the negative  side of the reference point is indexed with -1.\n\nSee also: joint_visits, marginal_visits.\n\nExample\n\nusing Entropies\n\nrefpoint = [0, 0, 0]\nsteps = [0.2, 0.2, 0.3]\nencode_as_bin(rand(3), refpoint, steps)\n\n\n\n\n\n","category":"function"},{"location":"VisitationFrequency/#Entropies.joint_visits","page":"Visitation frequency","title":"Entropies.joint_visits","text":"joint_visits(points, binning_scheme::RectangularBinning) → Vector{Vector{Int}}\n\nDetermine which bins are visited by points given the rectangular binning scheme ϵ. Bins are referenced relative to the axis minima, and are  encoded as integers, such that each box in the binning is assigned a unique integer array (one element for each dimension). \n\nFor example, if a bin is visited three times, then the corresponding  integer array will appear three times in the array returned.\n\nSee also: marginal_visits, encode_as_bin.\n\nExample\n\nusing DelayEmbeddings, Entropies\n\npts = Dataset([rand(5) for i = 1:100]);\njoint_visits(pts, RectangularBinning(0.2))\n\n\n\n\n\n","category":"function"},{"location":"VisitationFrequency/#Entropies.marginal_visits","page":"Visitation frequency","title":"Entropies.marginal_visits","text":"marginal_visits(points, binning_scheme::RectangularBinning, dims) → Vector{Vector{Int}}\n\nDetermine which bins are visited by points given the rectangular binning scheme ϵ, but only along the desired dimensions dims. Bins are referenced  relative to the axis minima, and are encoded as integers, such that each box  in the binning is assigned a unique integer array (one element for each  dimension in dims). \n\nFor example, if a bin is visited three times, then the corresponding  integer array will appear three times in the array returned.\n\nSee also: joint_visits, encode_as_bin.\n\nExample\n\nusing DelayEmbeddings, Entropies\npts = Dataset([rand(5) for i = 1:100]);\n\n# Marginal visits along dimension 3 and 5\nmarginal_visits(pts, RectangularBinning(0.3), [3, 5])\n\n# Marginal visits along dimension 2 through 5\nmarginal_visits(pts, RectangularBinning(0.3), 2:5)\n\n\n\n\n\nmarginal_visits(joint_visits, dims) → Vector{Vector{Int}}\n\nIf joint visits have been precomputed using joint_visits, marginal  visits can be returned directly without providing the binning again  using the marginal_visits(joint_visits, dims) signature.\n\nSee also: joint_visits, encode_as_bin.\n\nExample\n\nusing DelayEmbeddings, Entropies\npts = Dataset([rand(5) for i = 1:100]);\n\n# First compute joint visits, then marginal visits along dimensions 1 and 4\njv = joint_visits(pts, RectangularBinning(0.2))\nmarginal_visits(jv, [1, 4])\n\n# Marginals along dimension 2\nmarginal_visits(jv, 2)\n\n\n\n\n\n","category":"function"},{"location":"#Entropies.jl","page":"Documentation","title":"Entropies.jl","text":"","category":"section"},{"location":"","page":"Documentation","title":"Documentation","text":"This package provides entropy estimators used for entropy computations in the CausalityTools.jl and DynamicalSystems.jl packages.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"Most of the code in this package assumes that your data is represented by the Dataset-type from DelayEmbeddings.jl, where each observation is a D-dimensional data point represented by a static vector. See the DynamicalSystems.jl documentation for more info.","category":"page"}]
}