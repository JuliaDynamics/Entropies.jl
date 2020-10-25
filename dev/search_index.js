var documenterSearchIndex = {"docs":
[{"location":"SymbolicPermutation/#Permutation-(symbolic)","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"","category":"section"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"SymbolicPermutation","category":"page"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"entropy(x::Dataset{N, T}, est::SymbolicPermutation) where {N, T}","category":"page"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"probabilities(x::Dataset{N, T}, est::SymbolicPermutation) where {N, T}","category":"page"},{"location":"SymbolicPermutation/#Example","page":"Permutation (symbolic)","title":"Example","text":"","category":"section"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"This example reproduces the permutation entropy example on the logistic map from Bandt and Pompe (2002).","category":"page"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"using DynamicalSystems, PyPlot, Entropies\n\nds = Systems.logistic()\nrs = 3.5:0.001:4\nN_lyap, N_ent = 100000, 10000\n\n# Generate one time series for each value of the logistic parameter r\nlyaps, hs_entropies, hs_chaostools = Float64[], Float64[], Float64[]\n\nfor r in rs\n    ds.p[1] = r\n    push!(lyaps, lyapunov(ds, N_lyap))\n    \n    # For 1D systems `trajectory` returns a vector, so embed it using τs\n    # to get the correct 6d dimension on the embedding\n    x = trajectory(ds, N_ent)\n    τs = ([-i for i in 0:6-1]...,) # embedding lags\n    emb = genembed(x, τs)\n    \n    # Pre-allocate symbol vector, one symbol for each point in the embedding - this is faster!\n    s = zeros(Int, length(emb));\n    push!(hs_entropies, entropy!(s, emb, SymbolicPermutation(6, b = Base.MathConstants.e)))\n\n    # Old ChaosTools.jl style estimation\n    push!(hs_chaostools, permentropy(x, 6))\nend\n\nf = figure(figsize = (10,6))\na1 = subplot(311)\nplot(rs, lyaps); ylim(-2, log(2)); ylabel(\"\\$\\\\lambda\\$\")\na1.axes.get_xaxis().set_ticklabels([])\nxlim(rs[1], rs[end]);\n\na2 = subplot(312)\nplot(rs, hs_chaostools; color = \"C1\"); xlim(rs[1], rs[end]); \nxlabel(\"\\$r\\$\"); ylabel(\"\\$h_6 (ChaosTools.jl)\\$\")\n\na3 = subplot(313)\nplot(rs, hs_entropies; color = \"C2\"); xlim(rs[1], rs[end]); \nxlabel(\"\\$r\\$\"); ylabel(\"\\$h_6 (Entropies.jl)\\$\")\ntight_layout()\nsavefig(\"permentropy.png\")","category":"page"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"(Image: )","category":"page"},{"location":"SymbolicPermutation/#Utils","page":"Permutation (symbolic)","title":"Utils","text":"","category":"section"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"Some convenience functions for symbolization are provided.","category":"page"},{"location":"SymbolicPermutation/","page":"Permutation (symbolic)","title":"Permutation (symbolic)","text":"symbolize\nencode_motif","category":"page"},{"location":"histogram_estimation/","page":"-","title":"-","text":"non0hist","category":"page"},{"location":"histogram_estimation/","page":"-","title":"-","text":"binhist","category":"page"},{"location":"VisitationFrequency/#Visitation-frequency","page":"Visitation frequency","title":"Visitation frequency","text":"","category":"section"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"VisitationFrequency","category":"page"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"entropy(x::Dataset, est::VisitationFrequency)","category":"page"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"probabilities(x::Dataset, est::VisitationFrequency)","category":"page"},{"location":"VisitationFrequency/#Specifying-binning/boxes","page":"Visitation frequency","title":"Specifying binning/boxes","text":"","category":"section"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"RectangularBinning","category":"page"},{"location":"VisitationFrequency/#Utils","page":"Visitation frequency","title":"Utils","text":"","category":"section"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"Some convenience functions for symbolization are provided.","category":"page"},{"location":"VisitationFrequency/","page":"Visitation frequency","title":"Visitation frequency","text":"encode\njoint_visits\nmarginal_visits","category":"page"},{"location":"#Entropies.jl","page":"Documentation","title":"Entropies.jl","text":"","category":"section"},{"location":"","page":"Documentation","title":"Documentation","text":"This package provides entropy estimators used for entropy computations in the CausalityTools.jl and DynamicalSystems.jl packages.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"Most of the code in this package assumes that your data is represented by the Dataset-type from DelayEmbeddings.jl, where each observation is a D-dimensional data point represented by a static vector. See the DynamicalSystems.jl documentation for more info.","category":"page"}]
}