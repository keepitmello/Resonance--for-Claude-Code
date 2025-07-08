#!/bin/bash

# Resonance™ for Claude Code - Auto Start Script
# Opens two terminal windows with Opus and Sonnet sessions

# Load language configuration
CONFIG_FILE="$HOME/.claude/resonance-config.json"
LANGUAGE="en"

if [[ -f "$CONFIG_FILE" ]]; then
    # Extract language from JSON config
    LANGUAGE=$(grep '"language"' "$CONFIG_FILE" 2>/dev/null | cut -d'"' -f4)
    if [[ -z "$LANGUAGE" ]]; then
        LANGUAGE="en"
    fi
fi

# Language-specific messages
if [[ "$LANGUAGE" == "ko" ]]; then
    MSG_STARTING="세션 시작 중"
    MSG_CLAUDE_NOT_FOUND="❌ 오류: 'claude' 명령어를 찾을 수 없습니다!"
    MSG_CLAUDE_INSTALL="   Claude Code를 설치해주세요"
    MSG_CLAUDE_FOUND="✓ Claude Code 위치"
    MSG_OPENING_OPUS="🚀 Opus 세션 열기 (계획 및 리뷰)..."
    MSG_OPENING_SONNET="🚀 Sonnet 세션 열기 (구현)..."
    MSG_VSCODE_DETECTED="📝 VSCode 기반 편집기 감지..."
    MSG_CREATING_TERMINAL="   🚀 새 터미널 탭 생성 중"
    MSG_TERMINAL_SUCCESS="   ✓ 터미널 생성 성공"
    MSG_TERMINAL_READY="   💡 터미널 탭 준비 완료"
    MSG_RUNNING_MODEL="   📝 실행 중인 Claude 모델"
    MSG_AUTO_FAIL="   ⚠️  자동 생성 실패, 수동으로 생성해주세요"
    MSG_COMMAND="   명령어"
    MSG_ALL_SUCCESS="✅ 모든 Claude Code 세션이 성공적으로 열렸습니다!"
    MSG_PARTIAL_SUCCESS="⚠️  부분 성공: $SUCCESS_COUNT/$TOTAL_TERMINALS 터미널 열림"
    MSG_TROUBLESHOOTING="💡 문제 해결 팁:"
    MSG_CHECK_TERMINALS="   • VSCode에 모든 터미널이 표시되는지 확인"
    MSG_CHECK_ERRORS="   • 터미널에 오류 메시지가 있는지 확인"
    MSG_TRY_MANUAL="   • 필요한 경우 명령어를 수동으로 실행"
    MSG_FAILED="❌ 터미널 자동 열기 실패"
    MSG_MANUAL_SETUP="📋 수동 설정 필요:"
    MSG_WORKFLOW="📌 Resonance™ 워크플로우:"
    MSG_VSCODE_TIPS="💡 VSCode 팁:"
    MSG_SWITCH_TERMINALS="   • 터미널 전환: Cmd+Option+← / →"
    MSG_SPLIT_TERMINAL="   • 터미널 분할: Cmd+\\"
    MSG_TERMINAL_DROPDOWN="   • 터미널 드롭다운: 패널에서 터미널 이름 클릭"
    MSG_HAPPY_CODING="즐거운 코딩하세요! Resonance™와 함께! 🎉"
else
    MSG_STARTING="Starting Sessions"
    MSG_CLAUDE_NOT_FOUND="❌ Error: 'claude' command not found!"
    MSG_CLAUDE_INSTALL="   Please make sure Claude Code is installed"
    MSG_CLAUDE_FOUND="✓ Found Claude Code at"
    MSG_OPENING_OPUS="🚀 Opening Opus session (Planning & Review)..."
    MSG_OPENING_SONNET="🚀 Opening Sonnet session (Implementation)..."
    MSG_VSCODE_DETECTED="📝 VSCode-based editor detected..."
    MSG_CREATING_TERMINAL="   🚀 Creating new terminal tab for"
    MSG_TERMINAL_SUCCESS="   ✓ Terminal created successfully"
    MSG_TERMINAL_READY="   💡 Terminal tab is ready"
    MSG_RUNNING_MODEL="   📝 Running Claude with model"
    MSG_AUTO_FAIL="   ⚠️  Auto-creation failed, please create manually"
    MSG_COMMAND="   Command"
    MSG_ALL_SUCCESS="✅ All Claude Code sessions opened successfully!"
    MSG_PARTIAL_SUCCESS="⚠️  Partially successful: $SUCCESS_COUNT/$TOTAL_TERMINALS terminals opened"
    MSG_TROUBLESHOOTING="💡 Troubleshooting tips:"
    MSG_CHECK_TERMINALS="   • Check if all terminals are visible in VSCode"
    MSG_CHECK_ERRORS="   • Look for any error messages in the terminals"
    MSG_TRY_MANUAL="   • Try running the commands manually if needed"
    MSG_FAILED="❌ Failed to open terminals automatically"
    MSG_MANUAL_SETUP="📋 Manual setup required:"
    MSG_WORKFLOW="📌 Resonance™ Workflow:"
    MSG_VSCODE_TIPS="💡 VSCode Tips:"
    MSG_SWITCH_TERMINALS="   • Switch terminals: Cmd+Option+← / →"
    MSG_SPLIT_TERMINAL="   • Split terminal: Cmd+\\"
    MSG_TERMINAL_DROPDOWN="   • Terminal dropdown: Click terminal name in panel"
    MSG_HAPPY_CODING="Happy coding with Resonance™! 🎉"
fi

echo ""
echo "    ╭─────────────────────────────────────────────────────────────────╮"
echo "    │                                                                 │"
echo "    │   ╔═╗  ╔═╗  ╔═╗  ╔═╗  ╔╗╔  ╔═╗  ╔╗╔  ╔═╗  ╔═╗                 │"
echo "    │   ╠╦╝  ║╣   ╚═╗  ║ ║  ║║║  ╠═╣  ║║║  ║    ║╣                  │"
echo "    │   ╩╚═  ╚═╝  ╚═╝  ╚═╝  ╝╚╝  ╩ ╩  ╝╚╝  ╚═╝  ╚═╝  ™              │"
echo "    │                                                                 │"
echo "    │                      ✨ $MSG_STARTING ✨                    │"
echo "    │                                                                 │"
echo "    ╰─────────────────────────────────────────────────────────────────╯"
echo ""

# Find claude command dynamically
find_claude() {
    local claude_path=""
    
    # Try to find claude in PATH first
    if command -v claude &> /dev/null; then
        # Get the actual path (resolve aliases/functions)
        claude_path=$(which claude 2>/dev/null)
        
        # If it's an alias, extract the real path
        if [[ "$claude_path" == *"aliased to"* ]]; then
            claude_path=$(alias claude 2>/dev/null | sed -E "s/.*aliased to '?([^']+)'?.*/\1/")
        fi
        
        # If it's a symlink, get the real path
        if [[ -L "$claude_path" ]]; then
            claude_path=$(readlink -f "$claude_path" 2>/dev/null || readlink "$claude_path")
        fi
    fi
    
    # If still not found, search in common directories
    if [[ -z "$claude_path" ]] || [[ ! -x "$claude_path" ]]; then
        local search_paths=(
            "$HOME/.claude/local"
            "$HOME/.local/bin"
            "$HOME/bin"
            "/usr/local/bin"
            "/opt/homebrew/bin"
            "/usr/bin"
            "/bin"
            "$HOME/.npm/bin"
            "$HOME/.yarn/bin"
        )
        
        for dir in "${search_paths[@]}"; do
            if [[ -x "$dir/claude" ]]; then
                claude_path="$dir/claude"
                break
            fi
        done
    fi
    
    echo "$claude_path"
}

CLAUDE_CMD=$(find_claude)

# If not found, show error
if [[ -z "$CLAUDE_CMD" ]] || [[ ! -x "$CLAUDE_CMD" ]]; then
    echo "$MSG_CLAUDE_NOT_FOUND"
    echo "$MSG_CLAUDE_INSTALL"
    echo ""
    if [[ "$LANGUAGE" == "ko" ]]; then
        echo "   일반적인 설치 방법:"
        echo "   • 다운로드: https://claude.ai/download"
        echo "   • Homebrew: brew install claude"
        echo "   • npm: npm install -g @anthropic/claude-cli"
        echo ""
        echo "   claude가 설치되어 있지만 찾을 수 없다면 PATH에 추가하세요"
    else
        echo "   Common installation methods:"
        echo "   • Download from: https://claude.ai/download"
        echo "   • Homebrew: brew install claude"
        echo "   • npm: npm install -g @anthropic/claude-cli"
        echo ""
        echo "   If claude is installed but not found, add it to your PATH"
    fi
    exit 1
fi

echo "$MSG_CLAUDE_FOUND: $CLAUDE_CMD"

# Track success/failure
SUCCESS_COUNT=0
TOTAL_TERMINALS=2

# Function to open new terminal window based on terminal app
open_terminal() {
    local title=$1
    local command=$2
    
    # Check which terminal app is running
    if [[ "$TERM_PROGRAM" == "Apple_Terminal" ]] || [[ -z "$TERM_PROGRAM" ]]; then
        # Use Terminal.app
        osascript <<EOF 2>/dev/null
tell application "Terminal"
    do script "$command"
    set current settings of front window to settings set "Pro"
    set custom title of front window to "$title"
end tell
EOF
        if [[ $? -eq 0 ]]; then
            echo "   ✓ Terminal window opened"
            ((SUCCESS_COUNT++))
        else
            echo "   ⚠️  Failed to open Terminal window"
        fi
    elif [[ "$TERM_PROGRAM" == "iTerm.app" ]]; then
        # Use iTerm2
        osascript <<EOF 2>/dev/null
tell application "iTerm"
    create window with default profile
    tell current session of current window
        write text "$command"
        set name to "$title"
    end tell
end tell
EOF
        if [[ $? -eq 0 ]]; then
            echo "   ✓ iTerm window opened"
            ((SUCCESS_COUNT++))
        else
            echo "   ⚠️  Failed to open iTerm window"
        fi
    elif [[ "$TERM_PROGRAM" == "vscode" ]]; then
        # VSCode/Cursor/Windsurf terminal
        echo "$MSG_VSCODE_DETECTED"
        
        # Find the code command for VSCode variants
        local code_cmd=""
        if command -v code &> /dev/null; then
            code_cmd="code"
        elif [[ -x "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ]]; then
            code_cmd="/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
        elif [[ -x "/Applications/Cursor.app/Contents/Resources/app/bin/code" ]]; then
            code_cmd="/Applications/Cursor.app/Contents/Resources/app/bin/code"
        elif [[ -x "/Applications/Windsurf.app/Contents/Resources/app/bin/code" ]]; then
            code_cmd="/Applications/Windsurf.app/Contents/Resources/app/bin/code"
        fi
        
        if [[ -n "$code_cmd" ]]; then
            # Create new terminal tab and send command
            echo "$MSG_CREATING_TERMINAL: $title"
            
            # Create terminal, rename it, and send command
            # Note: rename requires the terminal to be active
            "$code_cmd" --command "workbench.action.terminal.new" \
                       --command "workbench.action.terminal.rename" \
                       --args "{\"title\":\"$title\"}" \
                       --command "workbench.action.terminal.sendSequence" \
                       --args "{\"text\":\"$command\\u000D\"}" 2>/dev/null
            
            if [[ $? -eq 0 ]]; then
                echo "$MSG_TERMINAL_SUCCESS"
                
                # Terminal created successfully - count as success
                # (Process check is unreliable in VSCode terminal)
                ((SUCCESS_COUNT++))
                echo "$MSG_TERMINAL_READY: '$title'"
                # Extract just the model name
                local model_name=$(echo "$command" | sed -n 's/.*--model \([^ ]*\).*/\1/p')
                echo "$MSG_RUNNING_MODEL: $model_name"
            else
                echo "$MSG_AUTO_FAIL"
                echo "$MSG_COMMAND: $command"
            fi
        else
            # Fallback to manual instructions
            echo "   ⚡ Quick start for VSCode:"
            echo "   1. Split terminal: Cmd+\\ or click '+' icon"
            echo "   2. Run: $command"
            echo "   3. Rename tab to: $title (right-click → Rename)"
        fi
    else
        # Fallback: just echo instructions
        echo "Please open a new terminal and run: $command"
    fi
}

echo "$MSG_OPENING_OPUS"
open_terminal "Resonance - Opus" "$CLAUDE_CMD --model opus"

# Small delay to avoid window overlap
sleep 1

echo "$MSG_OPENING_SONNET"
open_terminal "Resonance - Sonnet" "$CLAUDE_CMD --model sonnet"

echo ""

# Show final status
if [[ $SUCCESS_COUNT -eq $TOTAL_TERMINALS ]]; then
    echo "$MSG_ALL_SUCCESS"
elif [[ $SUCCESS_COUNT -gt 0 ]]; then
    if [[ "$LANGUAGE" == "ko" ]]; then
        echo "⚠️  부분 성공: $SUCCESS_COUNT/$TOTAL_TERMINALS 터미널 열림"
    else
        echo "⚠️  Partially successful: $SUCCESS_COUNT/$TOTAL_TERMINALS terminals opened"
    fi
    echo ""
    echo "$MSG_TROUBLESHOOTING"
    echo "$MSG_CHECK_TERMINALS"
    echo "$MSG_CHECK_ERRORS"
    echo "$MSG_TRY_MANUAL"
else
    echo "$MSG_FAILED"
    echo ""
    echo "$MSG_MANUAL_SETUP"
    if [[ "$LANGUAGE" == "ko" ]]; then
        echo "   1. VSCode에서 새 터미널 2개 생성 (Cmd+Shift+P → 'Terminal: Create New Terminal')"
        echo "   2. 첫 번째 터미널:  $CLAUDE_CMD --model opus"
        echo "   3. 두 번째 터미널: $CLAUDE_CMD --model sonnet"
    else
        echo "   1. Create two new terminals in VSCode (Cmd+Shift+P → 'Terminal: Create New Terminal')"
        echo "   2. In first terminal:  $CLAUDE_CMD --model opus"
        echo "   3. In second terminal: $CLAUDE_CMD --model sonnet"
    fi
fi

echo ""
echo "$MSG_WORKFLOW"
if [[ "$LANGUAGE" == "ko" ]]; then
    echo "   1. Opus 터미널에서:    /cycle-plan"
    echo "   2. Sonnet 터미널에서:  /cycle-start"
    echo "   3. Sonnet 터미널에서:  /cycle-log"
    echo "   4. Opus 터미널에서:    /cycle-check"
else
    echo "   1. In Opus terminal:    /cycle-plan"
    echo "   2. In Sonnet terminal:  /cycle-start"
    echo "   3. In Sonnet terminal:  /cycle-log"
    echo "   4. In Opus terminal:    /cycle-check"
fi
echo ""

# Show terminal status if in VSCode
if [[ "$TERM_PROGRAM" == "vscode" ]]; then
    echo "$MSG_VSCODE_TIPS"
    echo "$MSG_SWITCH_TERMINALS"
    echo "$MSG_SPLIT_TERMINAL"
    echo "$MSG_TERMINAL_DROPDOWN"
    echo ""
fi

echo "$MSG_HAPPY_CODING"