
SMLTOJS = smltojs
NPM = npm
BABEL_PLUGINS = ./$(BUILDDIR)/babel-src/node_modules/@babel/plugin-transform-react-jsx

MKDIR = mkdir --parents
SED = sed
RM = rm --force
LN = ln --symbolic
HEAD = head
GIT = git
MV = mv --force

BUILDDIR = _build

.PHONY: check clean deploy

all: $(BUILDDIR)/uscheme.html

clean:
	$(RM) --recursive $(BUILDDIR)/babel-src
	$(RM) --recursive ./src/MLB
	$(RM) $(BUILDDIR)/babel $(BUILDDIR)/amalg.js $(BUILDDIR)/app.js $(BUILDDIR)/output.html $(BUILDDIR)/uscheme.html

check:
	@$(SMLTOJS) --version
	@echo "npm $$($(NPM) --version)"
	@$(GIT) --version
	@$(MKDIR) --version | head --lines=1
	@$(SED) --version | head --lines=1
	@$(RM) --version | head --lines=1
	@$(LN) --version | head --lines=1
	@$(MV) --version | head --lines=1

deploy: $(BUILDDIR)/uscheme.html
	git checkout gh-pages
	$(MV) $(BUILDDIR)/uscheme.html index.html
	git add index.html
	git commit -m 'updated site'
	git push
	git checkout -

$(BUILDDIR):
	$(MKDIR) $@
$(BUILDDIR)/babel-src:
	$(MKDIR) $@

# Take all the smltojs dependencies and amalgamate them
$(BUILDDIR)/amalg.js: $(BUILDDIR)/output.html
	$(SED) -n 's/.*src="\(.*\)".*/\1/p' $< | xargs cat > $@

# Build with smltojs
$(BUILDDIR)/output.html: src/uscheme.mlb src/mlscheme.sml src/run.sml src/stubs.sml | $(BUILDDIR)
	$(SMLTOJS) --output $(basename $@) $<
	$(RM) --recursive MLB

$(BUILDDIR)/app.js: ./app.jsx $(BUILDDIR)/babel
	$(BUILDDIR)/babel --plugins $(BABEL_PLUGINS) $< > $@

$(BUILDDIR)/babel-src/node_modules/.bin/babel: | $(BUILDDIR)/babel-src
	cd $(BUILDDIR)/babel-src && $(NPM) install @babel/core @babel/cli @babel/plugin-transform-react-jsx
$(BUILDDIR)/babel: $(BUILDDIR)/babel-src/node_modules/.bin/babel
	if test ! -e $@; then $(LN) ./babel-src/node_modules/.bin/babel $@; fi

$(BUILDDIR)/uscheme.html: template.html $(BUILDDIR)/app.js $(BUILDDIR)/amalg.js
	$(SED) \
		--expression="/AMALG\\.JS/ r $(BUILDDIR)/amalg.js" \
		--expression="/AMALG\\.JS/ d" \
		--expression="/APP\\.JS/ r $(BUILDDIR)/app.js" \
		--expression="/APP\\.JS/ d" \
		$< >$@

